from __future__ import unicode_literals
from rest_framework import status
from django.views.generic import TemplateView
from models import CustomerLead, AgentLead, Property, Address, Nearest, Overlooking, Video, FloorPlan
from django.views import generic
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from serializers import CustomerLeadSerializer, AgentLeadSerializer, PropertySerializer, AddressSerializer,\
    OverlookingSerializer, TopPropertySerializer, RetrievePropertySerializer
from rest_framework.views import APIView
import itertools
from django.db.models import Q
from django.http import HttpResponseForbidden, HttpResponse


class CustomerLeadsAPIView(ListCreateAPIView):

    from buyproperty.models import CustomerLead

    serializer_class = CustomerLeadSerializer
    queryset = CustomerLead.objects.all()


class AgentLeadsAPIView(ListCreateAPIView):

    from buyproperty.models import AgentLead

    serializer_class = AgentLeadSerializer
    queryset = AgentLead.objects.all()


class ListCreateAddressAPIView(ListCreateAPIView):
    '''
    List all Address objects, or create one.
    '''
    serializer_class = AddressSerializer
    queryset = Address.objects.all()
    ordering_fields = "__all__"


class ListCreatePropertyAPIView(ListCreateAPIView):
    from buyproperty.models import Property

    serializer_class = PropertySerializer
    queryset = Property.objects.all()

    def create(self, request, *args, **kwargs):
        if (request.data.get("is_top") == 'true' or request.data.get("is_top") is True) and Property.count_top() == 6:
            return Response({"status": False, "message": ""}, status=400)
        # create address object if requested
        new_address = Address.create_address(request.data.get("address"))
        # create property object with request data
        property = Property.create_property(request.data, new_address)

        #create nearest list if requested
        if request.data.get("nearest"):
            for key, value in request.data.get("nearest").items():
                property.nearest.add(Nearest.create_nearest(key, value))
        ""
        import pdb
        pdb.set_trace()
        #create overlooking if requested
        if request.data.get("overlooking"):
            for id in request.data.get("overlooking"):
                property.overlooking.add(Overlooking.objects.get(pk=id))
        ""
        pdb.set_trace()
        #create and add images to propety
        self.add_images_to_property(request.data.get("images"), property)
        ""
        #create videos objects and add to property
        if request.data.get("videos"):
            for obj in request.data.get("videos"):
                property.videos.add(Video.create_video(obj))
        ""
        # create floor plan if requested
        if request.data.get("floor_plan"):
            for i in range(0, len(request.data.get("floor_plan")[0])):
                #create a floor plan with description using list of descriptions and floor number
                plan = FloorPlan.create_plan(i, request.data.get("floor_plan")[0][i])

                #create image objects using list of imagelists and add it to plan
                self.add_images_to_property(request.data.get("floor_plan")[1][i], plan)

                #create video objects using list of video Objects and add them to plan
                for vidObj in request.data.get("floor_plan")[2][i]:
                    plan.videos.add(Video.create_video(vidObj))

                #Finally, add this plan to list of floor plans in property
                property.floor_plan.add(plan)
        ""
        return Response(PropertySerializer(property).data, status=status.HTTP_201_CREATED)

    def add_images_to_property(self, images, property):
        media = list()
        for image in images:
            import base64
            from django.core.files.base import ContentFile
            from .models import Media
            image_format, img_str = image['image'].split(';base64,')
            ext = image_format.split('/')[-1]

            data = ContentFile(base64.b64decode(img_str), name=Media.generate_unique_key(10) + '.' + ext)
            media.append(Media.objects.create(file=data, type=image['type'], title=image['title'],
                                              description=image['description'],
                                              default_in_group=image['defaultInGroup']))
        [property.images.add(_media) for _media in media]


class ListOverlookingAPIView(ListAPIView):
    from buyproperty.models import Overlooking

    serializer_class = OverlookingSerializer
    queryset = Overlooking.objects.all()


class RetrieveUpdateDestroyPropertyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = RetrievePropertySerializer

    def update(self, request, *args, **kwargs):

        if (request.data.get("is_top") == 'true' or request.data.get("is_top") is True) and Property.count_top() == 6:
            return Response({"status": False, "message": "Top cannot be more than 6"}, status=400)

        data = request.data
        property = self.get_object()
        import pdb

        if data.get("nearest"):
            property.nearest.clear()
            for key, value in data.get("nearest").items():
                property.nearest.add(Nearest.create_nearest(key, value))
        pdb.set_trace()


        serializer = self.serializer_class(property, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(PropertySerializer(property).data, status=status.HTTP_200_OK)


class RetrieveUpdateDestroyAddressAPIView(RetrieveUpdateDestroyAPIView):

    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def get_object(self):
        return Address.objects.get(id=self.kwargs['pk'])


class RetrieveTopPropertyView(ListAPIView):
    queryset = Property.objects.filter(is_top=True)
    serializer_class = TopPropertySerializer


class SearchResultApiView(ListAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        results = Property.objects.filter(Q(address__city__icontains=self.kwargs['key']) |
                                          Q(landmark__icontains=self.kwargs['key']))
        return results


class CountryCodeListView(APIView):
    """
    Returns country code list.
    """
    from country_code import country_code_data

    def format_country_code_data(self):
        return [{"code": country_code["code"], "id": country_code["code"]} for country_code in self.country_code_data]

    def get(self, request):
        return Response(self.format_country_code_data(), status=status.HTTP_200_OK)


class DashboardView(TemplateView):
    template_name = "../templates/dashboard/dashboard.html"

    def active_tab(self):
        return "home"


class CustomerLeadView(generic.ListView):
    template_name = "../templates/dashboard/customer-leads.html"
    context_object_name = 'leads'

    def get_queryset(self):
        return CustomerLead.objects.all()

    def active_tab(self):
        return "customer-leads"


class AgentLeadView(generic.ListView):
    template_name = "../templates/dashboard/agent-leads.html"
    context_object_name = 'agent_leads'

    def get_queryset(self):
        return AgentLead.objects.all()

    def active_tab(self):
        return "agent-leads"


class LoginView(TemplateView):
    template_name = "../templates/dashboard/login.html"

    def active_tab(self):
        return "login"


class PropertyListView(generic.ListView):
    template_name = "../templates/dashboard/property-list.html"
    context_object_name = 'property_list'

    def get_queryset(self):
        return Property.objects.all()

    def active_tab(self):
        return "properties"


class PropertyDetailsView(TemplateView):
    template_name = "../templates/dashboard/property-details.html"

    def active_tab(self):
        return "properties"


class PropertyCreateView(TemplateView):
    template_name = "../templates/dashboard/property-create.html"

    def active_tab(self):
        return "property-create"


class UploadMediaView(ListCreateAPIView):
    serializer_class = PropertySerializer
    property = Property.objects.all()

