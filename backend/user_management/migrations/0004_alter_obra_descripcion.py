# Generated by Django 5.0.4 on 2024-05-02 22:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0003_alter_obra_estado_alter_obra_nombre'),
    ]

    operations = [
        migrations.AlterField(
            model_name='obra',
            name='descripcion',
            field=models.TextField(default=''),
        ),
    ]
