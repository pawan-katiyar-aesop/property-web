from django.conf.urls import url
from buyproperty import views

urlpatterns = [
    url(r'^home/$', views.HomePageView.as_view(), name="property-home-page"),
    url(r'^dash/home/$', views.DashboardView.as_view(), name="property-dashboard"),
    url(r'^get-customer-leads/$', views.CustomerLeadsAPIView.as_view(), name="list-create-customer-lead"),
    url(r'^dash/customer-leads/$', views.CustomerLeadView.as_view(), name="property-customer-lead"),
    url(r'^dash/agent-leads/$', views.AgentLeadView.as_view(), name="property-agent-lead"),
    url(r'^dash/agent-leads/get-agent-leads/$', views.AgentLeadsAPIView.as_view(), name="property-agent-lead"),
    url(r'^dash/login/$', views.LoginView.as_view(), name="property-login"),
    url(r'^dash/properties/$', views.PropertyListView.as_view(), name="property-property-list"),
    url(r'^dash/property-create/$', views.PropertyCreateView.as_view(), name="property-property-create"),
    url(r'^dash/property-details/$', views.PropertyDetailsView.as_view(), name="property-property-details"),


]
