from rest_framework import serializers
from .models import Obra, ObraPersonal
from user_management.models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'tipo_usuario', 'nombre', 'foto_perfil']
        #exclude = ['password']

class ObraPersonalSerializer(serializers.ModelSerializer):
    #personal = UsuarioSerializer(many=True)
    class Meta:
        model = ObraPersonal
        #fields = '__all__'
        #exclude = ['id_obra']
        fields = ['personal']


#para incluir datos en el obra serializer
class IncludePersonalSerializer(serializers.ModelSerializer):
    personal = UsuarioSerializer(many=True, read_only=True)
    class Meta:
        model = ObraPersonal
        #fields = '__all__'
        exclude = ['id_obra']


class ObraSerializer(serializers.ModelSerializer):
    obra_personal = ObraPersonalSerializer(source='obrapersonal', read_only=False)
    obra_personal_read = IncludePersonalSerializer(source='obrapersonal', read_only=True)
    id_capataces = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), many=True, required=False)
    id_director = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), required=False)

    class Meta:
        model=Obra
        #fields = '__all__'
        fields = ['id', 'obra_personal', 'obra_personal_read', 'id_capataces', 'id_director', 'nombre', 'descripcion', 'ubicacion', 'estado', 'activo', 'tipo_obra', 'fecha_inicio', 'fecha_final']
        extra_kwargs = {
            'obra_personal_read': {'read_only': True},
        }


    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id_capataces'] = UsuarioSerializer(instance.id_capataces, many=True).data
        representation['id_director'] = UsuarioSerializer(instance.id_director).data
        return representation


    def create(self, validated_data):
        id_capataces = validated_data.pop('id_capataces', None)
        obra_personal_data = validated_data.pop('obrapersonal', None)

        obra = Obra.objects.create(**validated_data)

        if id_capataces:
            obra.id_capataces.set(id_capataces)

        # obra_personal = ObraPersonal.objects.create(id_obra=obra)

        if obra_personal_data:
            personal = obra_personal_data.get('personal')
            obra_personal = ObraPersonal.objects.create(id_obra=obra)

            if personal:
                obra_personal.personal.set(personal)
            obra_personal.save()

        return obra

    def update(self, instance, validated_data):
        id_capataces = validated_data.pop('id_capataces', None)
        obra_personal_data = validated_data.pop('obrapersonal', None)

        instance = super().update(instance, validated_data)

        if id_capataces:
            instance.id_capataces.set(id_capataces)

        if obra_personal_data:
            if hasattr(instance, 'obrapersonal'):
                obra_personal = instance.obrapersonal
            else:
                obra_personal = ObraPersonal.objects.create(id_obra=instance)
            obra_personal.personal.set(obra_personal_data.get('personal', []))
            obra_personal.save()

        return instance
