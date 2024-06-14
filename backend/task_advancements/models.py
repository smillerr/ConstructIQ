from django.db import models
from gestion_tareas.models import Tarea
from django.db.models import Q, JSONField
from django.utils import timezone
from datetime import timedelta

class Avances(models.Model):

    id_task = models.OneToOneField(Tarea, on_delete=models.CASCADE, primary_key = True) 
    descripcion = models.TextField(null=False,default='')
    #nota_voz = models.FileField(upload_to="records")
    georeferencia = JSONField(null=True, blank=True) #latitud y longitud

