from rest_framework import viewsets, status
from .serializer import ObraSerializer, ObraPersonalSerializer, ImgObraSerializer
from .models import Obra, ObraPersonal
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .forms import UploadObraForm
from google.cloud import storage
from django.shortcuts import get_object_or_404
from datetime import datetime
from rest_framework.views import APIView
from .permissions import UserTypePermission



# Create your views here.

# Añadir decoradores para proteger acceso

class ObraViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, UserTypePermission]
    serializer_class = ObraSerializer
    queryset = Obra.objects.all()
    def get_queryset(self):
        queryset = Obra.objects.all()
        director = self.request.query_params.get('director', None)
        capataz = self.request.query_params.get('capataz', None)

        if director:
            queryset = queryset.filter(id_director__id=director)
        if capataz:
            queryset = queryset.filter(id_capataces__id=capataz)

        return queryset

class ObraPersonalViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = ObraPersonal.objects.all()
    serializer_class = ObraPersonalSerializer


@api_view(['POST'])
def upload_obra(request, obra_id):
    obra = get_object_or_404(Obra, pk=obra_id)
    img_obra = request.FILES.get('img_obra')


    current_date = datetime.now().strftime('%S')

    img_obra.name = f"obra{obra_id}-{current_date}"


    if not img_obra:
        return Response({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Initialize a client
    client = storage.Client()
    # Firebase/Google Cloud storage bucket
    bucket = client.bucket('constructiq-f2a29.appspot.com')

    # subdirectory for obras
    subdirectory = 'obras_images/'
    blob = bucket.blob(f"{subdirectory}{img_obra.name}")
    # blob = bucket.blob(img_obra.name)

    blob.upload_from_file(img_obra, content_type=img_obra.content_type)
    obra.img_obra = blob.public_url  # Store the public URL in model Obra
    obra.save()

    serializer = ImgObraSerializer(obra)
    return Response(serializer.data, status=status.HTTP_200_OK)


