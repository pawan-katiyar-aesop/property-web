from __future__ import unicode_literals

from django.contrib import admin
from buyproperty.models import Property, Users, Address, Landmark, Leads, FloorPlan


admin.site.register(Property)
admin.site.register(Users)
admin.site.register(Address)
admin.site.register(Landmark)
admin.site.register(Leads)
admin.site.register(FloorPlan)