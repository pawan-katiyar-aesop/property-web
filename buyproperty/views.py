from __future__ import unicode_literals
from rest_framework import status
from django.views.generic import TemplateView
from models import CustomerLead, AgentLead, Property, Address
from django.views import generic
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from serializers import CustomerLeadSerializer, AgentLeadSerializer, PropertySerializer, AddressSerializer
from rest_framework.views import APIView


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
        properti = Property.create_property(self.request.data)

        return Response(PropertySerializer(properti).data, status=status.HTTP_201_CREATED)


class RetrieveUpdateDestroyPropertyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def get_object(self):
        return Property.objects.get(id=self.kwargs['pk'])


class RetrieveUpdateDestroyAddressAPIView(RetrieveUpdateDestroyAPIView):

    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def get_object(self):
        return Address.objects.get(id=self.kwargs['pk'])


class CountryCodeListView(APIView):
    """
    Returns country code list.
    """
    from country_code import country_code_data

    def format_country_code_data(self):
        return [{"code": country_code["code"], "id": country_code["code"]} for country_code in self.country_code_data]

    def get(self, request):
        return Response(self.format_country_code_data(), status=status.HTTP_200_OK)


class HomePageView(TemplateView):
    template_name = "../templates/homepage.html"


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


class PropertyCreateView(TemplateView, CreateAPIView):
    template_name = "../templates/dashboard/property-create.html"

    def active_tab(self):
        return "property-create"
