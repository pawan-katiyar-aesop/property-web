# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-11-01 14:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buyproperty', '0014_address_locality'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='earthing',
            field=models.BooleanField(default=False),
        ),
    ]
