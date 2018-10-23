from __future__ import unicode_literals

from django.contrib import admin
from buyproperty.models import Property, Owner, Address, Landmark, Leads


admin.site.register(Property)
admin.site.register(Owner)
admin.site.register(Address)
admin.site.register(Landmark)
admin.site.register(Leads)