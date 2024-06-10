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

def obra_image_view(request):

    if request.method == 'POST':
        form = ObraForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('success')
    else:
        form = ObraForm()
    return render(request, 'obra_image_form.html', {'form': form})


def success(request):
    return HttpResponse('successfully uploaded')

def display_obra_images(request):

    if request.method == 'GET':

        # getting all the objects of hotel.
        Obras = Obra.objects.all()
        return render(request, 'display_obra_images.html',
                       {'obra_images': Obras})

"""
def upload_obra(request):
    if request.method == 'POST':
        form = UploadObraForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('upload_success')
    else:
        form = UploadObraForm()
    return render(request, 'upload_obra.html', {'form': form})
"""

@api_view(['POST'])
def upload_obra(request, obra_id):
    obra = get_object_or_404(Obra, pk=obra_id)
    img_obra = request.FILES.get('img_obra')

    if not img_obra:
        return Response({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Initialize a client
    client = storage.Client()
    bucket = client.bucket('constructiq-f2a29.firebaseapp.com')
    blob = bucket.blob(img_obra.name)

    blob.upload_from_file(img_obra, content_type=img_obra.content_type)
    obra.img_obra = blob.public_url  # Store the public URL in your model
    obra.save()

    serializer = ObraSerializer(obra)
    return Response(serializer.data, status=status.HTTP_200_OK)
