from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    foto_perfil = serializers.URLField(read_only=True)
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

class UserInformationSerializer(serializers.ModelSerializer):
    foto_perfil = serializers.URLField(read_only=True)
    class Meta:
        model = Usuario
        fields = ['id', 'login', 'nombre', 'apellido', 'tipo_usuario', 'email'] # You can add as much as additional Usuario fields needed 

class ImgUsuarioSerializer(serializers.ModelSerializer):
    foto_perfil = serializers.URLField(read_only=True)

    class Meta:
        model = Usuario
        fields = ['foto_perfil']


