from __future__ import unicode_literals
from django.db import models
from choices import country_choices
from django.contrib.postgres.fields import JSONField


class Address(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True)
    line_1 = models.CharField(max_length=100, blank=True, null=True)
    line_2 = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    zip = models.CharField(max_length=6, null=True, blank=True)

    def __str__(self):
        if self.line_1 and self.name:
            return self.name + " " + self.line_1
        else:
            return self.name


class Nearest(models.Model):
    LOCALITY_CHOICES = [
        ('bus', 'Bus Stop'),
        ('school', 'School'),
        ('mall', 'Shopping Mall'),
        ('hospital', 'Hospital'),
        ('bank', 'Bank'),
        ('atm', 'ATM'),
        ('restaurant', 'Restaurant'),
        ('metro', 'Metro Station'),
        ('train', 'Train Station'),
        ('pharmacy', 'Pharmacy')
    ]
    title = models.CharField(choices=LOCALITY_CHOICES, null=True, blank=True, max_length=20)
    distance = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title if self.title else None


class Media(models.Model):
    TYPE_CHOICE = [
        ('img', 'Image'),
        ('vid', 'Video')
    ]
    title = models.CharField(max_length=220, null=True, blank=True)
    type = models.CharField(choices=TYPE_CHOICE, null=True, blank=True, max_length=3)
    description = models.TextField(null=True, blank=True)
    file = models.FileField(null=True)

    def __str__(self):
        return "Media " + str(self.id) + " : " + str(self.title) if self.id and self.title else None


class Overlooking(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name if self.name else None


class OtherCharges(models.Model):
    charge_desc = models.CharField(blank=True, null=True, max_length=100)
    amount = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return self.charge_desc if self.charge_desc else None


class Property(models.Model):
    FURNISHING_CHOICE = [
        ('semi', 'Semi Furnished'),
        ('bare', 'Bareshell')
    ]
    PARKING_CHOICE = [
        ('cover', 'Covered'),
        ('expose', 'Exposed')
    ]
    FACING_CHOICE = [
        ('n', 'North'),
        ('ne', 'North East'),
        ('nw', 'North West'),
        ('s', 'South'),
        ('se', 'South East'),
        ('sw', 'South west'),
        ('e', 'East'),
        ('w', 'West'),
    ]
    FLOORING_CHOICE = [
        ('tile', 'Tiles'),
        ('wood', 'Wooden'),
        ('carpet', 'Carpet'),
        ('bare', 'Bare'),
    ]
    UNIT_CHOICES = [
        ('sqmt', 'Square Mt.'),
        ('sqft', 'Square Ft.')
    ]
    property_id = models.CharField(max_length=20, null=True)
    property_name = models.CharField(blank=True, max_length=250)
    furnishing_status = models.CharField(choices=FURNISHING_CHOICE, blank=True, null=True, max_length=30)
    unit_of_area = models.CharField(choices=UNIT_CHOICES, null=True, blank=True, max_length=20)
    buildup_area = models.FloatField(null=True, blank=True)
    carpet_area = models.FloatField(null=True, blank=True)
    rental_value = models.DecimalField(max_digits=12, decimal_places=2, null=True)
    monthly_maintenance = models.DecimalField(max_digits=12, decimal_places=2, null=True)
    security_deposit = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    pantry = models.BooleanField(default=False)
    washroom = models.BooleanField(default=False)
    washroom_details = JSONField(null=True, blank=True)
    number_of_floors = models.PositiveIntegerField(blank=True, null=True)
    number_of_basements = models.PositiveIntegerField(blank=True, null=True)
    total_number_of_floors = models.IntegerField(blank=True, null=True)
    units_on_floor = models.PositiveIntegerField(blank=True, null=True)
    power_backup = models.BooleanField(default=False)
    parking = models.CharField(choices=PARKING_CHOICE, blank=True, null=True, max_length=6)
    lift_availability = models.BooleanField(default=False)
    landmark = models.CharField(max_length=200, null=True, blank=True)
    parking_area = models.FloatField(blank=True, null=True)
    overlooking = models.ManyToManyField(Overlooking, blank=True)
    age = models.FloatField(null=True, blank=True)
    facing = models.CharField(choices=FACING_CHOICE, null=True, blank=True, max_length=2)
    flooring = models.CharField(choices=FLOORING_CHOICE, null=True, blank=True, max_length=6)
    a_c = models.BooleanField(default=False)
    cctv = models.BooleanField(default=False)
    cafeteria = models.BooleanField(default=False)
    fire_sprinklers = models.BooleanField(default=False)
    description = models.TextField(null=True, blank=True)
    ceiling_height = models.FloatField(blank=True, null=True)
    beam_height = models.FloatField(blank=True, null=True)
    earthing = models.BooleanField(default=True)
    electrical_con = models.BooleanField(default=False)
    flooring_details = models.TextField(blank=True, null=True)
    ceiling_details = models.TextField(blank=True, null=True)
    media = models.ManyToManyField(Media, blank=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    contact = models.CharField(max_length=10, blank=True, null=True)
    other_charges = JSONField(null=True, blank=True)
    lease_term = models.FloatField(null=True, blank=True)
    nearest = models.ManyToManyField(Nearest, blank=True)
    country_code = models.CharField(choices=country_choices, max_length=3, null=True, blank=True)

    def __str__(self):
        return self.property_id + " " + self.property_name if self.property_id and self.property_name else None

    @classmethod
    def create_property(cls, data):
        address = Address.objects.create(
            name=data.get("name"),
            line_1=data.get("street_line1"),
            line_2=data.get("street_line2"),
            city=data.get("city"),
            state=data.get("state"),
            country=data.get("country"),
            zip=data.get("zip")
        )
        property = cls.objects.create(
            property_name=data.get("property_name"),
            furnishing_status=data.get("furnishing_status"),
            unit_of_area=data.get("unit_of_area"),
            property_id=data.get("property_id"),
            carpet_area=data.get("carpet_area"),
            rental_value=data.get("rental_value"),
            address=address,
            monthly_maintenance=data.get("monthly_maintenance"),
            security_deposit=data.get("security_deposit"),
            pantry=data.get("pantry"),
            washroom=data.get("washroom"),
            washroom_details=data.get("washroom_details"),
            number_of_floors=data.get("number_of_floors"),
            number_of_basements=data.get("number_of_basements"),
            total_number_of_floors=data.get("total_number_of_floors"),
            units_on_floor=data.get("units_on_floor"),
            power_backup=data.get("power_backup"),
            parking=data.get("parking"),
            lift_availability=data.get("lift_availability"),
            # landmark=data.get("landmark"),
            parking_area=data.get("parking_area"),
            # overlooking=data.get("overlooking"),
            age=data.get("age"),
            facing=data.get("facing"),
            flooring=data.get("flooring"),
            a_c=data.get("a_c"),
            cctv=data.get("cctv"),
            cafeteria=data.get("cafeteria"),
            fire_sprinklers=data.get("fire_sprinklers"),
            description=data.get("description"),
            ceiling_height=data.get("ceiling_height"),
            beam_height=data.get("beam_height"),
            earthing=data.get("earthing"),
            electrical_con=data.get("electrical_con"),
            flooring_details=data.get("flooring_details"),
            ceiling_details=data.get("ceiling_details"),
            # media=data.get("media"),
            country_code=data.get("country_code"),
            contact=data.get("contact"),
            # other_charges=data.get("other_charges"),
            lease_term=data.get("lease_term"),
            # nearest=data.get("nearest"),
            buildup_area=data.get("buildup_area"),
        )
        return property


class FloorPlan(models.Model):
    FLOOR_CHOICES = [(x, x) for x in range(0, 4)]
    number_of_floors = models.IntegerField(default=1)
    base_floor = models.IntegerField(choices=FLOOR_CHOICES)


class CustomerLead(models.Model):
    name = models.CharField(max_length=250)
    email = models.EmailField(blank=True, null=True)
    contact = models.CharField(max_length=10, blank=True, null=True)
    country_code = models.CharField(choices=country_choices, max_length=3, null=True, blank=True)
    for_property = models.ForeignKey(Property, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.email if self.email else None


class AgentLead(models.Model):
    name = models.CharField(max_length=250)
    email = models.EmailField(blank=True, null=True)
    contact = models.CharField(max_length=10, blank=True, null=True)
    country_code = models.CharField(choices=country_choices, max_length=3, null=True, blank=True)
    message = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.email if self.email else None
