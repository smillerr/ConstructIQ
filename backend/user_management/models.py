from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    foto_perfil = models.BinaryField(null=True)
    login = models.CharField(max_length=100, unique=True)
    contraseña = models.CharField(max_length=100)
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
    activo = models.BooleanField(default=True)
    
    def __str__(self):
        return self.nombre


"""

class Obra(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(null=False,default='')
    ubicacion = models.CharField(max_length=100)
    tipo_obra = models.CharField(max_length=50)
    activo = models.BooleanField(default=True) # Elicitación Grupo 1, pregunta 7 una obra no se borra, se inahbilita
    ESTADOS_OBRA = (
        ('nueva', 'Nueva'),
        ('en desarrollo', 'En desarrollo'),
        ('en revisión', 'En revisión'),
        ('culminada', 'Culminada'),
    )
    estado = models.CharField(max_length=20, choices=ESTADOS_OBRA, default='nueva')
    id_capataz = models.ForeignKey(Usuario, related_name='obras_asignadas', on_delete=models.CASCADE)
    id_director= models.ForeignKey(Usuario, related_name='obras_dirigidas', on_delete=models.CASCADE)
    #id_capataz = models.ManyToManyField(Usuario, related_name='obras_asignadas') # many to many, para satisfacer elicitación pregunta 1, grupo 12: "Puede ser que sí tengamos varios capataces para una obra porque hay obras muy grandes que requieren varias cuadrillas de trabajadores."



    def delete(self, *args, **kwargs):
        # Elicitación Grupo 1, pregunta 7
        self.activo = False
        self.save()

    def __str__(self):
        return self.nombre

class ObraPersonal(models.Model):
    id_obra = models.ForeignKey(Obra, on_delete=models.CASCADE)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    TIPOS_USUARIO_OBRA = (
        ('Peon', 'Peón'),
        ('Ayudante de albañil', 'Ayudante de albañil'),
    )
    tipo_usuario = models.CharField(max_length=20, choices=TIPOS_USUARIO_OBRA)

class Tarea(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(null=False,default='')
    ESTADOS_TAREA = (
        ('asignada', 'Asignada'),
        ('en desarrollo', 'En desarrollo'),
        ('en revisión', 'En revisión'),
        ('aceptada', 'Aceptada'),
    )
    estado = models.CharField(max_length=20, choices=ESTADOS_TAREA)
    id_obra = models.ForeignKey(Obra, on_delete=models.CASCADE)
    id_capataz = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    activo = models.BooleanField(default=True)

    def delete(self, *args, **kwargs):
        # Elicitación Grupo 1, pregunta 7
        self.activo = False
        self.save()

    def __str__(self):
        return self.nombre
"""

