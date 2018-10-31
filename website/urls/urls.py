from django.conf.urls import url
from buyproperty import views

urlpatterns = [
    url(r'^website-home/$', views.HomePageView.as_view(), name="website-home-page"),

]
