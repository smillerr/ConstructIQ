from django.shortcuts import render
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework.response import Response
from .serializer import AvancesSerializer
from .models import Avances
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated  
from .permissions import AdvancementTypePermission
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from django.http import HttpResponse
#from .forms import UploadUsuarioForm
from google.cloud import storage
from django.shortcuts import get_object_or_404
from datetime import datetime




class AvancesViewSet(viewsets.ModelViewSet):
    queryset = Avances.objects.all()
    serializer_class = AvancesSerializer
    permission_classes = [AdvancementTypePermission]  # Set the permission class here

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
