from rest_framework import viewsets
from .serializer import ObraSerializer, ObraPersonalSerializer
from .models import Obra, ObraPersonal
from rest_framework.permissions import IsAuthenticated  
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import ObraForm

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
# Create your views here.

