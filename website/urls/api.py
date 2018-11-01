from django.conf.urls import url
from buyproperty import views

urlpatterns = [
    url(r'^property/top/$', views.RetrieveTopPropertyView.as_view(), name="retrieve-top-property"),
    url(r'^property/(?P<key>\w+)/$', views.SearchResultApiView.as_view(), name="retrieve-top-property")

]
