from django.db import models
from user_management.models import Usuario
from django.db.models import Q, JSONField
from django.utils import timezone
from datetime import timedelta
# Create your models here.

class Obra(models.Model):

    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(null=False,default='')
    #ubicacion = models.CharField(max_length=100)
    ubicacion = JSONField(null=True, blank=True)
    ESTADOS_OBRA = (
        ('nueva', 'Nueva'),
        ('en desarrollo', 'En desarrollo'),
        ('en revisión', 'En revisión'),
        ('culminada', 'Culminada'),
    )
    estado = models.CharField(max_length=20, choices=ESTADOS_OBRA, default='nueva')

    id_capataces = models.ManyToManyField(
    Usuario,
    related_name='obras_asignadas',
    limit_choices_to={
        'tipo_usuario': 'Capataz de obra',
        'is_active' : True
    }
    )

    id_director= models.ForeignKey(
    Usuario,
    related_name='obras_dirigidas',
    on_delete=models.CASCADE,
    limit_choices_to={
        'tipo_usuario': 'Director de obra',
        'is_active' : True
    }
    ) # many to many, para satisfacer elicitación pregunta 1, grupo 12: "Puede ser que sí tengamos varios capataces para una obra porque hay obras muy grandes que requieren varias cuadrillas de trabajadores."
    activo = models.BooleanField(default=True) # Elicitación Grupo 1, pregunta 7 una obra no se borra, se inahbilita

    TIPO_OBRA = (
        ('escuela', 'Escuela'),
        ('colegio', 'Colegio'),
        ('conjunto residencial', 'Conjunto residencial'),
        ('torre de apartamentos', 'Torre de apartamentos'),
        ('vial', 'Vial'),
        ('edificio', 'Edificio'),
        ('tienda', 'Tienda'),
        ('casa', 'Casa'),
        ('hospital', 'Hospital'),
        ('fábrica', 'Fábrica'),
        ('otros', 'Otros')
)
    tipo_obra = models.CharField(max_length=25, choices= TIPO_OBRA, default='edificio') 

    fecha_inicio = models.DateField(default=timezone.now, verbose_name="Fecha de inicio")
    fecha_final = models.DateField(default=timezone.now() + timedelta(days=6*30), verbose_name="Fecha final")






    def delete(self, *args, **kwargs):
        # Elicitación Grupo 1, pregunta 7
        self.activo = False
        self.save()

    # def __str__(self):  
        # return self.nombre

    # Método para obtener solo obras activas
    @classmethod
    def obras_activas(cls):
        return cls.objects.filter(activo=True)



class ObraPersonal(models.Model):
    id_obra = models.OneToOneField(Obra, on_delete=models.CASCADE, primary_key = True) #quiero que la ide de obra personal sea la de id_obra
    TIPOS_USUARIO_OBRA = (
        ('Peón', 'Peón'),
        ('Ayudante de albañil', 'Ayudante de albañil'),
    )
    # tipo_usuario = models.CharField(max_length=20
    #  , choices=TIPOS_USUARIO_OBRA,default='Peón')

    personal = models.ManyToManyField(
    Usuario,
    limit_choices_to=Q(
            tipo_usuario__in=['Peón', 'Ayudante de albañil'],
            is_active=True
        )
    )

