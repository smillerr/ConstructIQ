from rest_framework import serializers
from .models import Tarea
from user_management.models import Usuario
from user_management.serializer import UsuarioSerializerSimply

class TareaSerializer(serializers.ModelSerializer):
    capataz_encargado = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), allow_null=True)
    personal_asignado = serializers.PrimaryKeyRelatedField(many=True, queryset=Usuario.objects.all())

    class Meta:
        model = Tarea
        fields = ['id', 'tipo_tarea', 'descripcion', 'fecha_asignacion', 'fecha_estimada_fin', 'estado', 'obra', 'capataz_encargado', 'personal_asignado']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['capataz_encargado'] = UsuarioSerializerSimply(instance.capataz_encargado).data if instance.capataz_encargado else None
        response['personal_asignado'] = UsuarioSerializerSimply(instance.personal_asignado.all(), many=True).data
        return response
