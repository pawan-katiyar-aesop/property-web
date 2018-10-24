# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from __future__ import unicode_literals

from django.db import models
from datetime import datetime


class Address(models.Model):
    first_name = models.CharField(max_length=200, blank=False, null=False)
    last_name = models.CharField(max_length=200)
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


class Leads(models.Model):
    property = models.ForeignKey(Property)
    hits = models.IntegerField()


class Users(models.Model):
    ROLE_CHOICES = [(1, "Owner"), (2, "Agent"), (3, "Customer")]
    username = models.CharField(max_length=250)
    email = models.EmailField(blank=True, null=True)
    password = models.CharField(max_length=100)
    last_login = models.DateTimeField(default=datetime.now, blank=True)
    address = models.ForeignKey(Address)
    contact = models.IntegerField()
    role = models.CharField(max_length=1, choices=ROLE_CHOICES, default=1)

