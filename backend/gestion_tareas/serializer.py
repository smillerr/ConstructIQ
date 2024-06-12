from rest_framework import serializers
from .models import Tarea

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = '__all__'

from rest_framework import serializers
from .models import Tarea
from user_management.serializer import UsuarioSerializer

class TareaSerializer(serializers.ModelSerializer):
    capataz_encargado = UsuarioSerializer()
    personal_asignado = UsuarioSerializer(many=True)

    class Meta:
        model = Tarea
        fields = ['id', 'tipo_tarea', 'descripcion', 'fecha_asignacion', 'fecha_estimada_fin', 'estado', 'obra', 'capataz_encargado', 'personal_asignado']
