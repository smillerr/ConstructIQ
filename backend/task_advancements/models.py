from django.db import models
from gestion_tareas.models import Tarea
from django.db.models import Q, JSONField
from django.utils import timezone
from datetime import timedelta

class Avances(models.Model):

    #id_task = models.OneToOneField(Tarea, on_delete=models.CASCADE) 
    #id_task = models.ForeignKey(Tarea, on_delete=models.CASCADE)  # Changed to ForeignKey
    descripcion = models.TextField(null=False,default='')
    #nota_voz = models.FileField(upload_to="records")
    img_avance = models.ImageField(upload_to='images/', null = True, blank = True)
    georeferencia = JSONField(null=True, blank=True) #latitud y longitud
    tarea_porcentaje = models.IntegerField(default = 0)
    revision = models.BooleanField(default=False) 
    NECESIDADES_AVANCE = (
        ('materiales','Materiales'),
        ('asignar más personal',
        'Asignar más personal'),
        ('cambio condiciones climáticas',
        'Cambio condiciones climáticas')
    )
    necesidades = models.CharField(max_length=30, choices=NECESIDADES_AVANCE, default='materiales')
    activo = models.BooleanField(default=True) 


    def delete(self, *args, **kwargs):
        # Elicitación Grupo 1, pregunta 7
        self.activo = False
        self.save()
