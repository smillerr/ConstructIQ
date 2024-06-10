import logging
from rest_framework import status  
from rest_framework import viewsets
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

# Create your views here.

#Añadir decoradores para proteger acceso


class ObraViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    queryset = Obra.objects.all()
    serializer_class = ObraSerializer

class ObraPersonalViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    queryset = ObraPersonal.objects.all()
    serializer_class = ObraPersonalSerializer


@api_view(['POST'])
def upload_obra(request, obra_id):
    obra = get_object_or_404(Obra, pk=obra_id)
    img_obra = request.FILES.get('img_obra')

    if not img_obra:
        return Response({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Initialize a client
    client = storage.Client()
    bucket = client.bucket('constructiq-f2a29.appspot.com') # Firebase/Google Cloud storage bucket
    blob = bucket.blob(img_obra.name)

    blob.upload_from_file(img_obra, content_type=img_obra.content_type)
    obra.img_obra = blob.public_url  # Store the public URL in model Obra
    obra.save()

    serializer = ImgObraSerializer(obra)
    return Response(serializer.data, status=status.HTTP_200_OK)
