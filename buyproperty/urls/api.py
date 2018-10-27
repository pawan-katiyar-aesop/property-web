from django.conf.urls import url
from buyproperty import views

urlpatterns = [
    url(r'^get-customer-leads/$', views.CustomerLeadsAPIView.as_view(), name="list-create-customer-lead"),
    url(r'^get-agent-leads/$', views.AgentLeadsAPIView.as_view(), name="list-create-agent-lead")

]