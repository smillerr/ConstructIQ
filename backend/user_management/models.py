from django.db import models
from django.contrib.auth import models as auth_models

class Usuario(auth_models.AbstractUser):
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = [
        'nombre',
        'apellido',
        'tipo_identificacion',
        'numero_identificacion',
        'tipo_usuario',
        'password', 
    ]
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    foto_perfil = models.BinaryField(null=True) 
    genero = models.CharField(max_length=10)
    direccion = models.CharField(max_length=100)
    celular = models.CharField(max_length=20)
    numero_identificacion = models.CharField(max_length=50, default='1111509876')
    TIPOS_IDENTIFICACION = (
        ('Cedula', 'Cedula'),
        ('TI', 'TI'),
    )
    tipo_identificacion = models.CharField(max_length=20, choices=TIPOS_IDENTIFICACION)
    TIPOS_USUARIO = (
        ('Gerente', 'Gerente'),
        ('Director de obra', 'Director de obra'),
        ('Capataz de obra', 'Capataz de obra'),
        ('Peón', 'Peón'),
        ('Ayudante de albañil', 'Ayudante de albañil'),
    )
    tipo_usuario = models.CharField(max_length=20, choices=TIPOS_USUARIO)
    #is_active
    
    def __str__(self):
        return self.nombre
