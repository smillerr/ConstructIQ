# Generated by Django 4.2.13 on 2024-06-10 04:22

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('construction_management', '0013_obra_img_obra_alter_obra_fecha_final_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='obra',
            name='fecha_final',
            field=models.DateField(default=datetime.datetime(2024, 12, 7, 4, 22, 20, 954092, tzinfo=datetime.timezone.utc), verbose_name='Fecha final'),
        ),
        migrations.AlterField(
            model_name='obra',
            name='img_obra',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
