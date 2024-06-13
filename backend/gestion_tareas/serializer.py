from rest_framework import serializers
from .models import Tarea
from user_management.serializer import UsuarioSerializerSimply

class TareaSerializer(serializers.ModelSerializer):
    capataz_encargado = UsuarioSerializerSimply(allow_null=True)
    personal_asignado = UsuarioSerializerSimply(many=True)

    class Meta:
        model = Tarea
        fields = ['id', 'tipo_tarea', 'descripcion', 'fecha_asignacion', 'fecha_estimada_fin', 'estado', 'obra', 'capataz_encargado', 'personal_asignado']
