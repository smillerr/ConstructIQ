from django.shortcuts import render
from rest_framework import viewsets
from .models import Tarea
from .serializer import TareaSerializer
from rest_framework.response import Response
from user_management.serializer import UsuarioSerializer


class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        # Modificar los datos serializados para incluir la información completa del capataz y personal asignado
        for tarea_data in serializer.data:
            tarea_instance = Tarea.objects.get(pk=tarea_data['id'])
            tarea_data['capataz_encargado'] = UsuarioSerializer(tarea_instance.capataz_encargado).data
            tarea_data['personal_asignado'] = UsuarioSerializer(tarea_instance.personal_asignado.all(), many=True).data
        return Response(serializer.data)

