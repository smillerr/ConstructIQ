from rest_framework import serializers
from .models import Usuario
from .models import Obra 

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model=Usuario
        fields = '__all__'
class ObraSerializer(serializers.ModelSerializer):
    class Meta:
        model=Obra
        fields = '__all__'
