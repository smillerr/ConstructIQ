from rest_framework import viewsets, status
from .serializer import UsuarioSerializer, UserInformationSerializer
from .models import Usuario
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import UserTypePermission
from django.contrib.auth.hashers import make_password
import logging
logger = logging.getLogger("mylogger")

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        user_data = UserInformationSerializer(user).data
        token['data'] = user_data
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user
        data["user"] = UserInformationSerializer(user).data
        return data

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UsuarioViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated, UserTypePermission]
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def create(self, request, *args, **kwargs):
        # Get the data from the request
        request.data._mutable=True
        data = request.data
        print(request)
        # Hash the password
        password = make_password(data.get('password'))
        data['password'] = password
        data['is_active'] = True   
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



