from rest_framework import viewsets, status
from .serializer import UsuarioSerializer, UserInformationSerializer, ImgUsuarioSerializer
from .models import Usuario
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import UserTypePermission
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from django.http import HttpResponse
from .forms import UploadUsuarioForm
from google.cloud import storage
from django.shortcuts import get_object_or_404
from datetime import datetime




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
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

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

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        new_tipo_usuario = request.data.get('tipo_usuario')
        if new_tipo_usuario == "Peón" or new_tipo_usuario == 'Ayudante de albañil':
            serializer.validated_data['login'] = None
        # Hash the new password if it's provided
        password = request.data.get('password')
        if password:
            serializer.validated_data['password'] = make_password(password)

        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

@api_view(['POST'])
def upload_usuario(request, usuario_id):
    usuario = get_object_or_404(Usuario, pk=usuario_id)
    foto_perfil = request.FILES.get('foto_perfil')

    current_date = datetime.now().strftime('%Y-%m-%d-%H-%M-%S')

    foto_perfil.name = f"{usuario_id}{current_date}"


    if not foto_perfil:
        return Response({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Initialize a client
    client = storage.Client()
    bucket = client.bucket('constructiq-f2a29.appspot.com') # Firebase/Google Cloud storage bucket

    # subdirectory for usuarios 
    subdirectory = 'usuarios_images/'
    blob = bucket.blob(f"{subdirectory}{foto_perfil.name}")
    #blob = bucket.blob(foto_perfil.name)

    blob.upload_from_file(foto_perfil, content_type=foto_perfil.content_type)
    usuario.foto_perfil = blob.public_url  # Store the public URL in model usuario
    usuario.save()

    serializer = ImgUsuarioSerializer(usuario)
    return Response(serializer.data, status=status.HTTP_200_OK)
