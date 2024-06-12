from rest_framework import serializers
from .models import Tarea
from user_management.models import Usuario

class TareaSerializer(serializers.ModelSerializer):
    capataz_encargado = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), allow_null=True)
    personal_asignado = serializers.PrimaryKeyRelatedField(many=True, queryset=Usuario.objects.all())

    class Meta:
        model = Tarea
        fields = ['id', 'tipo_tarea', 'descripcion', 'fecha_asignacion', 'fecha_estimada_fin', 'estado', 'obra', 'capataz_encargado', 'personal_asignado']
