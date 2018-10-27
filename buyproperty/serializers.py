from rest_framework import serializers
from buyproperty.models import CustomerLead, AgentLead


class CustomerLeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerLead
        fields = "__all__"


class AgentLeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = AgentLead
        fields = "__all__"

