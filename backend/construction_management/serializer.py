from rest_framework import serializers
from .models import Obra, ObraPersonal
from user_management.models import Usuario


class ObraSerializer(serializers.ModelSerializer):
    class Meta:
        model=Obra
        fields = '__all__'

class ObraPersonalSerializer(serializers.ModelSerializer):
    #id_usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())  # Specify queryset here

    class Meta:
        model = ObraPersonal
        fields = '__all__'

