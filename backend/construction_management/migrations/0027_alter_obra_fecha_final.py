# Generated by Django 4.2.13 on 2024-06-14 06:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('construction_management', '0026_alter_obra_fecha_final'),
    ]

    operations = [
        migrations.AlterField(
            model_name='obra',
            name='fecha_final',
            field=models.DateField(default=datetime.datetime(2024, 12, 11, 6, 36, 19, 115133, tzinfo=datetime.timezone.utc), verbose_name='Fecha final'),
        ),
    ]