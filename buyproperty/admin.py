from __future__ import unicode_literals

from django.contrib import admin
from buyproperty.models import Property, Address, CustomerLead, AgentLead, FloorPlan, Nearest, Media, OtherCharges


admin.site.register(Property)
admin.site.register(CustomerLead)
admin.site.register(Address)
admin.site.register(AgentLead)
admin.site.register(FloorPlan)
admin.site.register(Nearest)
admin.site.register(Media)
admin.site.register(OtherCharges)