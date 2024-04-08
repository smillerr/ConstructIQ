# Generated by Django 5.0.3 on 2024-04-08 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='numero_identificacion',
            field=models.CharField(default='1111509876', max_length=50),
        ),
        migrations.AddField(
            model_name='usuario',
            name='tipo_identificacion',
            field=models.CharField(choices=[('Cedula', 'Cedula'), ('TI', 'TI')], default=123, max_length=20),
            preserve_default=False,
        ),
    ]