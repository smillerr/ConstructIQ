# Generated by Django 5.0.6 on 2024-06-14 17:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('avances', '0003_advancements_image_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='advancements',
            name='image_url',
        ),
    ]