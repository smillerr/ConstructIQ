from rest_framework import viewsets
from .serializer import UsuarioSerializer
from .models import Usuario

# Create your views here.

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer