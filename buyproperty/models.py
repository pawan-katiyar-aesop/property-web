# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from __future__ import unicode_literals

from django.db import models


class Address(models.Model):
    line_1 = models.CharField(max_length=100)
    line_2 = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    zip = models.IntegerField()


class Landmark(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name


class Property(models.Model):
    name = models.CharField(blank=True, max_length=250)
    type = models.CharField(max_length=5)
    category = models.CharField( null=True, blank=True, max_length=10)
    nearest_landmarks = models.ManyToManyField(Landmark)
    address = models.ForeignKey(Address)


class Owner(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200, null=True, blank=True)
    email = models.EmailField(blank=True)
    contact = models.IntegerField()


class Leads(models.Model):
    property = models.ForeignKey(Property)
    hits = models.IntegerField()