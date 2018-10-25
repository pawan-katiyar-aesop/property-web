# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-10-25 13:06
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('buyproperty', '0004_auto_20181025_1204'),
    ]

    operations = [
        migrations.CreateModel(
            name='AgentLead',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('contact', models.CharField(blank=True, max_length=10, null=True)),
                ('country_code', models.CharField(blank=True, choices=[(b'+7840', b'+7840'), (b'+93', b'+93'), (b'+355', b'+355'), (b'+213', b'+213'), (b'+1684', b'+1684'), (b'+376', b'+376'), (b'+244', b'+244'), (b'+1264', b'+1264'), (b'+1268', b'+1268'), (b'+54', b'+54'), (b'+374', b'+374'), (b'+297', b'+297'), (b'+247', b'+247'), (b'+61', b'+61'), (b'+672', b'+672'), (b'+43', b'+43'), (b'+994', b'+994'), (b'+1242', b'+1242'), (b'+973', b'+973'), (b'+880', b'+880'), (b'+1246', b'+1246'), (b'+1268', b'+1268'), (b'+375', b'+375'), (b'+32', b'+32'), (b'+501', b'+501'), (b'+229', b'+229'), (b'+1441', b'+1441'), (b'+975', b'+975'), (b'+591', b'+591'), (b'+387', b'+387'), (b'+267', b'+267'), (b'+55', b'+55'), (b'+246', b'+246'), (b'+1284', b'+1284'), (b'+673', b'+673'), (b'+359', b'+359'), (b'+226', b'+226'), (b'+257', b'+257'), (b'+855', b'+855'), (b'+237', b'+237'), (b'+1', b'+1'), (b'+238', b'+238'), (b'+345', b'+345'), (b'+236', b'+236'), (b'+235', b'+235'), (b'+56', b'+56'), (b'+86', b'+86'), (b'+61', b'+61'), (b'+61', b'+61'), (b'+57', b'+57'), (b'+269', b'+269'), (b'+242', b'+242'), (b'+243', b'+243'), (b'+682', b'+682'), (b'+506', b'+506'), (b'+385', b'+385'), (b'+53', b'+53'), (b'+599', b'+599'), (b'+537', b'+537'), (b'+420', b'+420'), (b'+45', b'+45'), (b'+246', b'+246'), (b'+253', b'+253'), (b'+1767', b'+1767'), (b'+1809', b'+1809'), (b'+670', b'+670'), (b'+56', b'+56'), (b'+593', b'+593'), (b'+20', b'+20'), (b'+503', b'+503'), (b'+240', b'+240'), (b'+291', b'+291'), (b'+372', b'+372'), (b'+251', b'+251'), (b'+500', b'+500'), (b'+298', b'+298'), (b'+679', b'+679'), (b'+358', b'+358'), (b'+33', b'+33'), (b'+596', b'+596'), (b'+594', b'+594'), (b'+689', b'+689'), (b'+241', b'+241'), (b'+220', b'+220'), (b'+995', b'+995'), (b'+49', b'+49'), (b'+233', b'+233'), (b'+350', b'+350'), (b'+30', b'+30'), (b'+299', b'+299'), (b'+1473', b'+1473'), (b'+590', b'+590'), (b'+1671', b'+1671'), (b'+502', b'+502'), (b'+224', b'+224'), (b'+245', b'+245'), (b'+595', b'+595'), (b'+509', b'+509'), (b'+504', b'+504'), (b'+852', b'+852'), (b'+36', b'+36'), (b'+354', b'+354'), (b'+91', b'+91'), (b'+62', b'+62'), (b'+98', b'+98'), (b'+964', b'+964'), (b'+353', b'+353'), (b'+972', b'+972'), (b'+39', b'+39'), (b'+225', b'+225'), (b'+1876', b'+1876'), (b'+81', b'+81'), (b'+962', b'+962'), (b'+77', b'+77'), (b'+254', b'+254'), (b'+686', b'+686'), (b'+965', b'+965'), (b'+996', b'+996'), (b'+856', b'+856'), (b'+371', b'+371'), (b'+961', b'+961'), (b'+266', b'+266'), (b'+231', b'+231'), (b'+218', b'+218'), (b'+423', b'+423'), (b'+370', b'+370'), (b'+352', b'+352'), (b'+853', b'+853'), (b'+389', b'+389'), (b'+261', b'+261'), (b'+265', b'+265'), (b'+60', b'+60'), (b'+960', b'+960'), (b'+223', b'+223'), (b'+356', b'+356'), (b'+692', b'+692'), (b'+596', b'+596'), (b'+222', b'+222'), (b'+230', b'+230'), (b'+262', b'+262'), (b'+52', b'+52'), (b'+691', b'+691'), (b'+1808', b'+1808'), (b'+373', b'+373'), (b'+377', b'+377'), (b'+976', b'+976'), (b'+382', b'+382'), (b'+1664', b'+1664'), (b'+212', b'+212'), (b'+95', b'+95'), (b'+264', b'+264'), (b'+674', b'+674'), (b'+977', b'+977'), (b'+31', b'+31'), (b'+599', b'+599'), (b'+1869', b'+1869'), (b'+687', b'+687'), (b'+64', b'+64'), (b'+505', b'+505'), (b'+227', b'+227'), (b'+234', b'+234'), (b'+683', b'+683'), (b'+672', b'+672'), (b'+850', b'+850'), (b'+1670', b'+1670'), (b'+47', b'+47'), (b'+968', b'+968'), (b'+92', b'+92'), (b'+680', b'+680'), (b'+970', b'+970'), (b'+507', b'+507'), (b'+675', b'+675'), (b'+595', b'+595'), (b'+51', b'+51'), (b'+63', b'+63'), (b'+48', b'+48'), (b'+351', b'+351'), (b'+1787', b'+1787'), (b'+974', b'+974'), (b'+262', b'+262'), (b'+40', b'+40'), (b'+7', b'+7'), (b'+250', b'+250'), (b'+685', b'+685'), (b'+378', b'+378'), (b'+966', b'+966'), (b'+221', b'+221'), (b'+381', b'+381'), (b'+248', b'+248'), (b'+232', b'+232'), (b'+65', b'+65'), (b'+421', b'+421'), (b'+386', b'+386'), (b'+677', b'+677'), (b'+27', b'+27'), (b'+500', b'+500'), (b'+82', b'+82'), (b'+34', b'+34'), (b'+94', b'+94'), (b'+249', b'+249'), (b'+597', b'+597'), (b'+268', b'+268'), (b'+46', b'+46'), (b'+41', b'+41'), (b'+963', b'+963'), (b'+886', b'+886'), (b'+992', b'+992'), (b'+255', b'+255'), (b'+66', b'+66'), (b'+670', b'+670'), (b'+228', b'+228'), (b'+690', b'+690'), (b'+676', b'+676'), (b'+1868', b'+1868'), (b'+216', b'+216'), (b'+90', b'+90'), (b'+993', b'+993'), (b'+1649', b'+1649'), (b'+688', b'+688'), (b'+1340', b'+1340'), (b'+256', b'+256'), (b'+380', b'+380'), (b'+971', b'+971'), (b'+44', b'+44'), (b'+1', b'+1'), (b'+598', b'+598'), (b'+998', b'+998'), (b'+678', b'+678'), (b'+58', b'+58'), (b'+84', b'+84'), (b'+1808', b'+1808'), (b'+681', b'+681'), (b'+967', b'+967'), (b'+260', b'+260'), (b'+255', b'+255'), (b'+263', b'+263')], max_length=3, null=True)),
                ('message', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CustomerLead',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('contact', models.CharField(blank=True, max_length=10, null=True)),
                ('country_code', models.CharField(blank=True, choices=[(b'+7840', b'+7840'), (b'+93', b'+93'), (b'+355', b'+355'), (b'+213', b'+213'), (b'+1684', b'+1684'), (b'+376', b'+376'), (b'+244', b'+244'), (b'+1264', b'+1264'), (b'+1268', b'+1268'), (b'+54', b'+54'), (b'+374', b'+374'), (b'+297', b'+297'), (b'+247', b'+247'), (b'+61', b'+61'), (b'+672', b'+672'), (b'+43', b'+43'), (b'+994', b'+994'), (b'+1242', b'+1242'), (b'+973', b'+973'), (b'+880', b'+880'), (b'+1246', b'+1246'), (b'+1268', b'+1268'), (b'+375', b'+375'), (b'+32', b'+32'), (b'+501', b'+501'), (b'+229', b'+229'), (b'+1441', b'+1441'), (b'+975', b'+975'), (b'+591', b'+591'), (b'+387', b'+387'), (b'+267', b'+267'), (b'+55', b'+55'), (b'+246', b'+246'), (b'+1284', b'+1284'), (b'+673', b'+673'), (b'+359', b'+359'), (b'+226', b'+226'), (b'+257', b'+257'), (b'+855', b'+855'), (b'+237', b'+237'), (b'+1', b'+1'), (b'+238', b'+238'), (b'+345', b'+345'), (b'+236', b'+236'), (b'+235', b'+235'), (b'+56', b'+56'), (b'+86', b'+86'), (b'+61', b'+61'), (b'+61', b'+61'), (b'+57', b'+57'), (b'+269', b'+269'), (b'+242', b'+242'), (b'+243', b'+243'), (b'+682', b'+682'), (b'+506', b'+506'), (b'+385', b'+385'), (b'+53', b'+53'), (b'+599', b'+599'), (b'+537', b'+537'), (b'+420', b'+420'), (b'+45', b'+45'), (b'+246', b'+246'), (b'+253', b'+253'), (b'+1767', b'+1767'), (b'+1809', b'+1809'), (b'+670', b'+670'), (b'+56', b'+56'), (b'+593', b'+593'), (b'+20', b'+20'), (b'+503', b'+503'), (b'+240', b'+240'), (b'+291', b'+291'), (b'+372', b'+372'), (b'+251', b'+251'), (b'+500', b'+500'), (b'+298', b'+298'), (b'+679', b'+679'), (b'+358', b'+358'), (b'+33', b'+33'), (b'+596', b'+596'), (b'+594', b'+594'), (b'+689', b'+689'), (b'+241', b'+241'), (b'+220', b'+220'), (b'+995', b'+995'), (b'+49', b'+49'), (b'+233', b'+233'), (b'+350', b'+350'), (b'+30', b'+30'), (b'+299', b'+299'), (b'+1473', b'+1473'), (b'+590', b'+590'), (b'+1671', b'+1671'), (b'+502', b'+502'), (b'+224', b'+224'), (b'+245', b'+245'), (b'+595', b'+595'), (b'+509', b'+509'), (b'+504', b'+504'), (b'+852', b'+852'), (b'+36', b'+36'), (b'+354', b'+354'), (b'+91', b'+91'), (b'+62', b'+62'), (b'+98', b'+98'), (b'+964', b'+964'), (b'+353', b'+353'), (b'+972', b'+972'), (b'+39', b'+39'), (b'+225', b'+225'), (b'+1876', b'+1876'), (b'+81', b'+81'), (b'+962', b'+962'), (b'+77', b'+77'), (b'+254', b'+254'), (b'+686', b'+686'), (b'+965', b'+965'), (b'+996', b'+996'), (b'+856', b'+856'), (b'+371', b'+371'), (b'+961', b'+961'), (b'+266', b'+266'), (b'+231', b'+231'), (b'+218', b'+218'), (b'+423', b'+423'), (b'+370', b'+370'), (b'+352', b'+352'), (b'+853', b'+853'), (b'+389', b'+389'), (b'+261', b'+261'), (b'+265', b'+265'), (b'+60', b'+60'), (b'+960', b'+960'), (b'+223', b'+223'), (b'+356', b'+356'), (b'+692', b'+692'), (b'+596', b'+596'), (b'+222', b'+222'), (b'+230', b'+230'), (b'+262', b'+262'), (b'+52', b'+52'), (b'+691', b'+691'), (b'+1808', b'+1808'), (b'+373', b'+373'), (b'+377', b'+377'), (b'+976', b'+976'), (b'+382', b'+382'), (b'+1664', b'+1664'), (b'+212', b'+212'), (b'+95', b'+95'), (b'+264', b'+264'), (b'+674', b'+674'), (b'+977', b'+977'), (b'+31', b'+31'), (b'+599', b'+599'), (b'+1869', b'+1869'), (b'+687', b'+687'), (b'+64', b'+64'), (b'+505', b'+505'), (b'+227', b'+227'), (b'+234', b'+234'), (b'+683', b'+683'), (b'+672', b'+672'), (b'+850', b'+850'), (b'+1670', b'+1670'), (b'+47', b'+47'), (b'+968', b'+968'), (b'+92', b'+92'), (b'+680', b'+680'), (b'+970', b'+970'), (b'+507', b'+507'), (b'+675', b'+675'), (b'+595', b'+595'), (b'+51', b'+51'), (b'+63', b'+63'), (b'+48', b'+48'), (b'+351', b'+351'), (b'+1787', b'+1787'), (b'+974', b'+974'), (b'+262', b'+262'), (b'+40', b'+40'), (b'+7', b'+7'), (b'+250', b'+250'), (b'+685', b'+685'), (b'+378', b'+378'), (b'+966', b'+966'), (b'+221', b'+221'), (b'+381', b'+381'), (b'+248', b'+248'), (b'+232', b'+232'), (b'+65', b'+65'), (b'+421', b'+421'), (b'+386', b'+386'), (b'+677', b'+677'), (b'+27', b'+27'), (b'+500', b'+500'), (b'+82', b'+82'), (b'+34', b'+34'), (b'+94', b'+94'), (b'+249', b'+249'), (b'+597', b'+597'), (b'+268', b'+268'), (b'+46', b'+46'), (b'+41', b'+41'), (b'+963', b'+963'), (b'+886', b'+886'), (b'+992', b'+992'), (b'+255', b'+255'), (b'+66', b'+66'), (b'+670', b'+670'), (b'+228', b'+228'), (b'+690', b'+690'), (b'+676', b'+676'), (b'+1868', b'+1868'), (b'+216', b'+216'), (b'+90', b'+90'), (b'+993', b'+993'), (b'+1649', b'+1649'), (b'+688', b'+688'), (b'+1340', b'+1340'), (b'+256', b'+256'), (b'+380', b'+380'), (b'+971', b'+971'), (b'+44', b'+44'), (b'+1', b'+1'), (b'+598', b'+598'), (b'+998', b'+998'), (b'+678', b'+678'), (b'+58', b'+58'), (b'+84', b'+84'), (b'+1808', b'+1808'), (b'+681', b'+681'), (b'+967', b'+967'), (b'+260', b'+260'), (b'+255', b'+255'), (b'+263', b'+263')], max_length=3, null=True)),
                ('for_property', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='buyproperty.Property')),
            ],
        ),
        migrations.RemoveField(
            model_name='leads',
            name='property',
        ),
        migrations.RemoveField(
            model_name='users',
            name='address',
        ),
        migrations.DeleteModel(
            name='Leads',
        ),
        migrations.DeleteModel(
            name='Users',
        ),
    ]
