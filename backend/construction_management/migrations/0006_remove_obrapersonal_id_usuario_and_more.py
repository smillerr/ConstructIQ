# Generated by Django 4.2.13 on 2024-06-08 03:22

import datetime
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('construction_management', '0005_obra_fecha_final'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='obrapersonal',
            name='id_usuario',
        ),
        migrations.AddField(
            model_name='obrapersonal',
            name='id_usuarios',
            field=models.ManyToManyField(limit_choices_to=models.Q(('is_active', True), ('tipo_usuario__in', ['Peón', 'Ayudante de albañil'])), to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='obra',
            name='fecha_final',
            field=models.DateField(default=datetime.datetime(2024, 12, 5, 3, 22, 38, 607619, tzinfo=datetime.timezone.utc), verbose_name='Fecha final'),
        ),
    ]
