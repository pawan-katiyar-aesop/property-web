# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-11-26 11:11
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('buyproperty', '0034_auto_20181126_1601'),
    ]

    operations = [
        migrations.RenameField(
            model_name='property',
            old_name='floor_number',
            new_name='floor_num',
        ),
    ]