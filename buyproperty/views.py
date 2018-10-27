from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView


class HomePageView(TemplateView):
    template_name = "../templates/homepage.html"


class DashboardView(TemplateView):
    template_name = "../templates/dashboard/dashboard.html"

    def active_tab(self):
        return "home"


class CustomerLeadView(TemplateView):
    template_name = "../templates/dashboard/customer-leads.html"

    def active_tab(self):
        return "customer-leads"


class AgentLeadView(TemplateView):
    template_name = "../templates/dashboard/agent-leads.html"

    def active_tab(self):
        return "agent-leads"


class LoginView(TemplateView):
    template_name = "../templates/dashboard/login.html"

    def active_tab(self):
        return "login"


class PropertyListView(TemplateView):
    template_name = "../templates/dashboard/property-list.html"

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
