# gestion_tareas/views.py
from django.shortcuts import render
from rest_framework import viewsets
from .models import Tarea
from .serializer import TareaSerializer
from rest_framework.response import Response
from user_management.serializer import UsuarioSerializerSimply
from django_filters import rest_framework as filters
from .filters import TareaFilter
from .permissions import permissions
from .permissions import UserTypePermission
from rest_framework.permissions import IsAuthenticated  



class TareaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, UserTypePermission] 
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = TareaFilter

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())  # Aplica los filtros
        serializer = self.get_serializer(queryset, many=True)
        # Modificar los datos serializados para incluir la información completa del capataz y personal asignado
        for tarea_data in serializer.data:
            tarea_instance = Tarea.objects.get(pk=tarea_data['id'])
            tarea_data['capataz_encargado'] = UsuarioSerializerSimply(tarea_instance.capataz_encargado).data
            tarea_data['personal_asignado'] = UsuarioSerializerSimply(tarea_instance.personal_asignado.all(), many=True).data
        return Response(serializer.data)
