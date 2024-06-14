from rest_framework import serializers
from .models import Avances

class AvancesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Avances
        fields = '__all__'

    
    def validate_georeferencia(self, value):
        if not isinstance(value, dict):
            raise serializers.ValidationError("georeferencia debe contener 'latitud' y 'longitud'.")
        
        if 'latitud' not in value or 'longitud' not in value:
            raise serializers.ValidationError("georeferencia debe contener 'latitud' y 'longitud'.")
        
        if not isinstance(value['latitud'], (float, int)) or not isinstance(value['longitud'], (float, int)):
            raise serializers.ValidationError("'latitud' y 'longitud' deben ser números.")

        return value
