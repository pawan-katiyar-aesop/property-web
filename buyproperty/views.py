from __future__ import unicode_literals
from rest_framework import status
from django.views.generic import TemplateView, View
from models import CustomerLead, AgentLead, Property, Address, Nearest, Overlooking, Video, FloorPlan, Media,\
    BannerSetting, TestimonialSetting, TestimonialSetting
from django.views import generic
from django.http import HttpResponseRedirect, JsonResponse
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from serializers import CustomerLeadSerializer, AgentLeadSerializer, PropertySerializer, AddressSerializer,\
    OverlookingSerializer, TopPropertySerializer, RetrievePropertySerializer, FloorPlanSerializer,\
    BannerTitleSerializer, TestimonialSettingSerializer
from rest_framework.views import APIView
import datetime
from django.db.models import Q
from django.http import HttpResponseForbidden, HttpResponse
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import logout


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
    queryset = Property.objects.all().order_by('-created_at')

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
        #create overlooking if requested
        if request.data.get("overlooking"):
            for id in request.data.get("overlooking"):
                property.overlooking.add(Overlooking.objects.get(pk=id))
        ""
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
                if len(request.data.get("floor_plan")[0][i]) != 0:
                    
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
        
        
        # add/remove overlooking if requested
        property.overlooking.clear()
        if request.data.get("overlooking"):
            for id in request.data.get("overlooking"):
                property.overlooking.add(Overlooking.objects.get(pk=id))
        
        if data.get("nearest"):
            property.nearest.clear()
            for key, value in data.get("nearest").items():
                property.nearest.add(Nearest.create_nearest(key, value))
        
        if data.get("images"):
            import base64
            from django.core.files.base import ContentFile
            from .models import Media
            
            property.images.clear()
            
            for image in data.get("images"):

                if image.get("id"):
                    #add these to property
                    property.images.add(Media.objects.get(pk=image['id']))
                else:
                    #create a new image object and add it to property
                    image_format, img_str = image['file'].split(';base64,')
                    ext = image_format.split('/')[-1]

                    data = ContentFile(base64.b64decode(img_str), name=Media.generate_unique_key(10) + '.' + ext)
                    property.images.add(Media.objects.create(file=data, type=image['type'], title=image['title'],
                                                      description=image['description'],
                                                      default_in_group=image['defaultInGroup']))
        
        property.videos.clear()
        if data.get("videos"):
            for video in data.get("videos"):
                if video.get('id'):
                    #add these videos to property
                    video_obj = Video.objects.get(pk=video['id'])
                    video_obj.url = video['url']
                    if len(video['type'])is not 0:
                        video_obj.type = video['type']
                    else:
                        video_obj.type = "b"
                    video_obj.save()
                    property.videos.add(video_obj)
                else:
                    #save new video object and add it to property
                    if len(video['type'])is 0:
                        video['type'] = 'b'
                    vid_obj = Video.create_video(video)
                    property.videos.add(vid_obj)

        property.save()
        
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


class ListCreateFloorPlanAPIView(ListCreateAPIView):

    serializer_class = FloorPlanSerializer
    queryset = FloorPlan.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data
        description = data.get("description")
        images = data.get("images")
        videos = data.get("videos")
        floor_number= data.get("floor_number")
        floor= data.get("no_of_floor")

        plan = FloorPlan.create_plan(floor_number, description, floor)
        self.add_images_to_plan(images, plan)
        for video in videos:
            plan.videos.add(Video.create_video(video))

        if data.get("property"):
            property = Property.objects.get(pk=data.get("property"))
            property.floor_plan.add(plan)
        return Response(FloorPlanSerializer(plan).data, status=status.HTTP_201_CREATED)

    def add_images_to_plan(self, images, plan):
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
        [plan.images.add(_media) for _media in media]


class RetrieveUpdateDestroyFloorPlanAPIView(RetrieveUpdateDestroyAPIView):

    serializer_class = FloorPlanSerializer
    queryset = FloorPlan.objects.all()

    def update(self, request, *args, **kwargs):
        from .models import Media, Video
        description = request.data.get("description")
        images = request.data.get("images")
        videos = request.data.get("videos")
        floor = request.data.get("no_of_floor")
        floor_plan = self.get_object()

        existing_image_ids = []
        posted_image_ids = []
        
        floor_plan.number_of_floor = floor
        #manage existing images, if removed
        floor_plan.images.clear()
        
        for image in images:
            if image.get('id'):
                floor_plan.images.add(Media.objects.get(pk=image['id']))
        
        #creating new images if sent
        media = list()
        
        for image in images:
            import base64
            from django.core.files.base import ContentFile
            from .models import Media
            if image.get('image'):
                image_format, img_str = image['image'].split(';base64,')
                ext = image_format.split('/')[-1]

                data = ContentFile(base64.b64decode(img_str), name=Media.generate_unique_key(10) + '.' + ext)
                media.append(Media.objects.create(file=data, type=image['type'], title=image['title'],
                                                  description=image['description'],
                                                  default_in_group=image['defaultInGroup']))
        [floor_plan.images.add(_media) for _media in media]
        
        
        #manaeg existing videos
        floor_plan.videos.clear()
        for video in videos:
            if video.get('id'):
                video_obj = Video.objects.get(pk=video['id'])
                video_obj.url = video['url']
                video_obj.save()
                
                floor_plan.videos.add(video_obj)
            else:
                video_obj = Video.create_video(video)
                floor_plan.videos.add(video_obj)

        



        
        floor_plan.description = description
        floor_plan.save()



        return Response(FloorPlanSerializer(floor_plan).data, status=status.HTTP_200_OK)


class CountryCodeListView(APIView):
    """
    Returns country code list.
    """
    from country_code import country_code_data

    def format_country_code_data(self):
        return [{"name": country_code["name"], "id": country_code["dial_code"]} for country_code in self.country_code_data]

    def get(self, request):
        return Response(self.format_country_code_data(), status=status.HTTP_200_OK)


class DashboardView(generic.ListView):
    template_name = "../templates/dashboard/dashboard.html"
    context_object_name = 'counts'
    permission_classes = (IsAuthenticated,)

    def is_authenticated(self):
        if self.request.user.is_anonymous:
            return HttpResponseRedirect("/control/dash/login/")

    def get_queryset(self):
        date_from = datetime.datetime.now() - datetime.timedelta(days=1)
        property_count = Property.objects.filter(updated_at__gte=(datetime.datetime.now() - datetime.timedelta(weeks=1))).count()
        agent_lead_count = AgentLead.objects.filter(created_at__gte=date_from).count()
        customer_lead_count = CustomerLead.objects.filter(created_at__gte=date_from).count()
        return {'property_count': property_count, 'agent_lead_count': agent_lead_count, 'customer_lead_count': customer_lead_count}

    def active_tab(self):
        return "home"


class CustomerLeadView(generic.ListView):
    template_name = "../templates/dashboard/customer-leads.html"
    context_object_name = 'leads'
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return CustomerLead.objects.all()

    def active_tab(self):
        return "customer-leads"


class AgentLeadView(generic.ListView):
    template_name = "../templates/dashboard/agent-leads.html"
    context_object_name = 'agent_leads'
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return AgentLead.objects.all()

    def active_tab(self):
        return "agent-leads"


class LoginView(TemplateView):
    template_name = "../templates/dashboard/login.html"

    def active_tab(self):
        return "login"

    def post(self, request):
        from django.contrib.auth import authenticate, login
        user = authenticate(username=request.POST.get("username"), password=request.POST.get("password"))
        if user is not None:
            login(self.request, user, backend='django.contrib.auth.backends.ModelBackend')
            return HttpResponseRedirect("/control/dash/home/")

        return JsonResponse({"status": False, "message": "Invalid email/password."})


class PropertyListView(generic.ListView):
    template_name = "../templates/dashboard/property-list.html"
    context_object_name = 'property_list'
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Property.objects.all()

    def active_tab(self):
        return "properties"


class PropertyDetailsView(TemplateView):
    template_name = "../templates/dashboard/property-details.html"
    permission_classes = (IsAuthenticated,)

    def active_tab(self):
        return "properties"


class SettingView(TemplateView):
    template_name = "../templates/dashboard/settings.html"
    permission_classes = (IsAuthenticated,)

    def active_tab(self):
        return "settings"


class PropertyCreateView(TemplateView):
    template_name = "../templates/dashboard/property-create.html"
    permission_classes = (IsAuthenticated,)

    def active_tab(self):
        return "property-create"


class UploadMediaView(ListCreateAPIView):
    serializer_class = PropertySerializer
    property = Property.objects.all()


class BannerSettingCreateListAPIView(ListCreateAPIView):
    serializer_class = BannerTitleSerializer
    queryset = BannerSetting.objects.all()

    def post(self, request, *args, **kwargs):
        requested_data = request.data
        BannerSetting.objects.all().delete()
        for banner_title in requested_data:
            BannerSetting.objects.create(title=banner_title.get("title"), show_on=banner_title.get("show_on"))
        return Response({"status": True})


class TestimonialAPIView(ListCreateAPIView):
    serializer_class = TestimonialSettingSerializer
    queryset = TestimonialSetting.objects.all()

    def post(self, request, *args, **kwargs):
        requested_data = request.data
        TestimonialSetting.objects.all().delete()
        for testmo in requested_data:
            TestimonialSetting.objects.create(name=testmo.get("name"), city=testmo.get("city"), message=testmo.get("message"))

        Response(self.serializer_class(self.get_queryset()).data)


class LogoutFlip(View):
    def get(self, request, *args, **kwargs):
        logout(self.request)
        return HttpResponseRedirect("/control/dash/login/")
