# Generated by Django 5.0.6 on 2024-06-05 19:14

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('construction_management', '0005_obra_fecha_final'),
    ]

    operations = [
        migrations.AlterField(
            model_name='obra',
            name='fecha_final',
            field=models.DateField(default=datetime.datetime(2024, 12, 2, 19, 14, 29, 251488, tzinfo=datetime.timezone.utc), verbose_name='Fecha final'),
        ),
    ]