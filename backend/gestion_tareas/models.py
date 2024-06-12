from django.db import models
from django.utils import timezone
from datetime import timedelta
from construction_management.models import Obra
from user_management.models import Usuario

class Tarea(models.Model):
    OBRA_NEGRA = 'obra_negra'
    OBRA_GRIS = 'obra_gris'
    OBRA_BLANCA = 'obra_blanca'
    TIPO_TAREA_CHOICES = [
        (OBRA_NEGRA, 'Obra Negra'),
        (OBRA_GRIS, 'Obra Gris'),
        (OBRA_BLANCA, 'Obra Blanca'),
    ]

    ASIGNADA = 'asignada'
    EN_DESARROLLO = 'en_desarrollo'
    EN_REVISION = 'en_revision'
    ACEPTADA = 'aceptada'
    ESTADO_CHOICES = [
        (ASIGNADA, 'Asignada'),
        (EN_DESARROLLO, 'En desarrollo'),
        (EN_REVISION, 'En revisión'),
        (ACEPTADA, 'Aceptada'),
    ]

    obra = models.ForeignKey(Obra, on_delete=models.CASCADE, related_name='tareas')
    capataz_encargado = models.ForeignKey(
        Usuario, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        limit_choices_to={'tipo_usuario': 'Capataz de obra', 'is_active': True}
    )
    personal_asignado = models.ManyToManyField(
        Usuario, 
        related_name='tareas_asignadas',
        limit_choices_to={
            'tipo_usuario__in': ['Peón', 'Ayudante de albañil'], 
            'is_active': True
        }
    )
    tipo_tarea = models.CharField(max_length=20, choices=TIPO_TAREA_CHOICES)
    descripcion = models.CharField(max_length=200)
    fecha_asignacion = models.DateField(default=timezone.now)
    fecha_estimada_fin = models.DateField(default=timezone.now() + timedelta(days=30))
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default=ASIGNADA)

    def __str__(self):
        return f"Tarea {self.id} de {self.obra.nombre}"
