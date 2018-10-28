from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from models import CustomerLead, AgentLead, Property
from django.views import generic
from rest_framework.generics import ListCreateAPIView
from serializers import CustomerLeadSerializer, AgentLeadSerializer, PropertySerializer


class CustomerLeadsAPIView(ListCreateAPIView):

    from buyproperty.models import CustomerLead

    serializer_class = CustomerLeadSerializer
    queryset = CustomerLead.objects.all()


class AgentLeadsAPIView(ListCreateAPIView):

    from buyproperty.models import AgentLead

    serializer_class = AgentLeadSerializer
    queryset = AgentLead.objects.all()


class ListCreatePropertyAPIView(ListCreateAPIView):
    from buyproperty.models import Property

    serializer_class = PropertySerializer
    queryset = Property.objects.all()


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


class PropertyCreateView(TemplateView):
    template_name = "../templates/dashboard/property-create.html"

    def active_tab(self):
        return "properties"
