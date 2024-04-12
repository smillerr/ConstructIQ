from rest_framework import viewsets
from .serializer import UsuarioSerializer
from .models import Usuario
from rest_framework.permissions import IsAuthenticated  
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.

#Añadir decoradores para proteger acceso


class LoginView(TokenObtainPairView):
    pass

class UsuarioViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
