from django.conf.urls import url
from buyproperty import views

urlpatterns = [
    url(r'^customer_leads/$', views.CustomerLeadsAPIView.as_view(), name="list-create-customer-lead"),
    url(r'^agent_leads/$', views.AgentLeadsAPIView.as_view(), name="list-create-agent-lead"),
    url(r'^property/$', views.ListCreatePropertyAPIView.as_view(), name="list-create-property"),
    url(r'^overlooking/$', views.ListOverlookingAPIView.as_view(), name="list-overlooking"),
    url(r'^address/$', views.ListCreateAddressAPIView.as_view(), name="list-create-property"),
    url(r'^address/(?P<pk>\d+)/$', views.RetrieveUpdateDestroyAddressAPIView.as_view(), name="retrieve-update-address"),
    url(r'^property/(?P<pk>\d+)/$', views.RetrieveUpdateDestroyPropertyAPIView.as_view(), name="retrieve-update-property"),
    url(r'^country_codes/$', views.CountryCodeListView.as_view(), name="retrieve-update-property"),
    url(r'^property/top/$', views.RetrieveTopPropertyView.as_view(), name="retrieve-top-property"),
    url(r'^property/(?P<key>\w+)/$', views.SearchResultApiView.as_view(), name="retrieve-top-property")


]
