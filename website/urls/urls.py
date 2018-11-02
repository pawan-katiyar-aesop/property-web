from django.conf.urls import url
from website import views

urlpatterns = [
    url(r'^$', views.HomePageView.as_view(), name="website-home-page"),
    url(r'^property-listing/$', views.PropertyListView.as_view(), name="website-listing"),
    url(r'^property-details/$', views.PropertyDetailsView.as_view(), name="website-details"),
    url(r'^about/$', views.AboutView.as_view(), name="website-about"),
    url(r'^contact/$', views.ContactView.as_view(), name="website-contact")

]
