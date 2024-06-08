from rest_framework import serializers
from .models import Obra, ObraPersonal
from user_management.models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'tipo_usuario', 'nombre', 'foto_perfil']
        #exclude = ['password']

class ObraPersonalSerializer(serializers.ModelSerializer):
    #personal = UsuarioSerializer(many=True, read_only=True)
    class Meta:
        model = ObraPersonal
        fields = '__all__'
        #exclude = ['id_obra']

#para incluir datos en el obra serializer
class IncludePersonalSerializer(serializers.ModelSerializer):
    personal = UsuarioSerializer(many=True, read_only=True)
    class Meta:
        model = ObraPersonal
        #fields = '__all__'
        exclude = ['id_obra']


class ObraSerializer(serializers.ModelSerializer):
    obra_personal = IncludePersonalSerializer(source='obrapersonal', read_only=True)
    id_capataces = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), many=True, required=False)
    id_director = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), required=False)
    class Meta:
        model=Obra
        fields = '__all__'

""" 
    def create(self, validated_data):
        obra_personal_data = validated_data.pop('obra_personal')

        obra = Obra.objects.create(**validated_data)

        id_obra = obra.id

        # asigna el id de obra en obra a obra personal, para no volverlo a poner
        ObraPersonal.objects.create(id_obra=obra, **obra_personal_data)

        return obra
"""
