from rest_framework import serializers
from .models import Obra, ObraPersonal
from user_management.models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'tipo_usuario', 'nombre', 'foto_perfil']
        #exclude = ['password']

class ObraPersonalSerializer(serializers.ModelSerializer):
    id_usuarios = UsuarioSerializer(many=True, read_only=True)
    class Meta:
        model = ObraPersonal
        #fields = '__all__'
        exclude = ['id_obra']


class ObraSerializer(serializers.ModelSerializer):
    obra_personal = ObraPersonalSerializer(source='obrapersonal', read_only=True)
    id_capataces = UsuarioSerializer(many=True, read_only=True)
    id_director = UsuarioSerializer(read_only=True)
    class Meta:
        model=Obra
        fields = '__all__'



