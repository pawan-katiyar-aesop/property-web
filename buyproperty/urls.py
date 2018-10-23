from django.conf.urls import url
from buyproperty import views

urlpatterns = [
    url(r'^home/$', views.HomePageView.as_view(), name="property-home-page")
]

