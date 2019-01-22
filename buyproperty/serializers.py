from rest_framework import serializers
from buyproperty.models import CustomerLead, AgentLead, Property, Address, Overlooking, FloorPlan, BannerSetting, \
    TestimonialSetting


class CustomerLeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerLead
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = "__all__"


class AgentLeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = AgentLead
        fields = "__all__"


class PropertySerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields = "__all__"
        depth = 1


class BannerTitleSerializer(serializers.ModelSerializer):

    class Meta:
        model = BannerSetting
        fields = "__all__"


class OverlookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Overlooking
        fields = "__all__"


class TopPropertySerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields = ('id', 'property_name', 'buildup_area', 'unit_of_area', 'floor_num', 'address', 'images', 'videos')
        depth = 1


class RetrievePropertySerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields = "__all__"
        depth = 2


class FloorPlanSerializer(serializers.ModelSerializer):

    class Meta:
        model = FloorPlan
        fields = "__all__"


class TestimonialSettingSerializer(serializers.ModelSerializer):

    class Meta:
        model = TestimonialSetting
        fields = "__all__"
