# Generated by Django 4.2.13 on 2024-06-14 06:55

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_tareas', '0012_alter_tarea_fecha_estimada_fin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarea',
            name='fecha_estimada_fin',
            field=models.DateField(default=datetime.datetime(2024, 7, 14, 6, 55, 29, 620749, tzinfo=datetime.timezone.utc)),
        ),
    ]
