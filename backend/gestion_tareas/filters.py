# gestion_tareas/filters.py
from django_filters import rest_framework as filters
from .models import Tarea

class TareaFilter(filters.FilterSet):
    obra = filters.NumberFilter(field_name='obra__id')
    capataz = filters.NumberFilter(field_name='capataz_encargado__id')

    class Meta:
        model = Tarea
        fields = ['obra', 'capataz_encargado']
