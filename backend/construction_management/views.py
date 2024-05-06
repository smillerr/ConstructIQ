from rest_framework import viewsets
from .serializer import ObraSerializer, ObraPersonalSerializer
from .models import Obra, ObraPersonal
from rest_framework.permissions import IsAuthenticated  
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import render
from .forms import ObraPersonalForm


# Create your views here.

#Añadir decoradores para proteger acceso


class LoginView(TokenObtainPairView):
    pass

class ObraViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    queryset = Obra.objects.all()
    serializer_class = ObraSerializer

class ObraPersonalViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    queryset = ObraPersonal.objects.all()
    serializer_class = ObraPersonalSerializer
# Create your views here.

