from django.conf.urls import url
from buyproperty import views

urlpatterns = [
    url(r'^customer_leads/$', views.CustomerLeadsAPIView.as_view(), name="list-create-customer-lead"),
    url(r'^agent_leads/$', views.AgentLeadsAPIView.as_view(), name="list-create-agent-lead"),
    url(r'^property/$', views.ListCreatePropertyAPIView.as_view(), name="list-create-property"),
    url(r'^property/(?P<pk>\d+)/$', views.RetrieveUpdateDestroyPropertyAPIView.as_view(), name="retreive-update-property")

]