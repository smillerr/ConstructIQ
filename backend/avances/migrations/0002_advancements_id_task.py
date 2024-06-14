# Generated by Django 5.0.6 on 2024-06-14 15:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('avances', '0001_initial'),
        ('gestion_tareas', '__first__'),
    ]

    operations = [
        migrations.AddField(
            model_name='advancements',
            name='id_task',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='tarea_in_advancements', to='gestion_tareas.tarea'),
        ),
    ]
