from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from user_management.models import Usuario
from construction_management.models import Obra, ObraPersonal
from django.db.models import Count, F, ExpressionWrapper, fields
from gestion_tareas.models import Tarea
from django.db.models import Count, Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from user_management.models import Usuario
from construction_management.models import Obra, ObraPersonal

class UserRoleStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_counts = Usuario.objects.values('tipo_usuario').annotate(count=Count('id'))
        return Response(user_counts)

class ObrasCompletarMasRapidoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        obras = Obra.objects.filter(activo=True).annotate(
            tiempo_restante=ExpressionWrapper(F('fecha_final') - F('fecha_inicio'), output_field=fields.DurationField())
        ).order_by('tiempo_restante')[:10]
        data = [{'nombre': obra.nombre, 'tiempo_restante': obra.tiempo_restante} for obra in obras]
        return Response(data)

class ObrasMayorRetrasoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        obras = Obra.objects.filter(activo=True).annotate(
            retraso=ExpressionWrapper(F('fecha_final') - F('fecha_inicio'), output_field=fields.DurationField())
        ).order_by('-retraso')[:10]
        data = [{'nombre': obra.nombre, 'retraso': obra.retraso} for obra in obras]
        return Response(data)

class ObrasMayorCantidadPersonalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        obras = Obra.objects.filter(activo=True).annotate(
            num_personal=Count('obrapersonal')
        ).order_by('-num_personal')[:10]
        data = [{'nombre': obra.nombre, 'num_personal': obra.num_personal} for obra in obras]
        return Response(data)


class NumeroObrasPorTipoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        obras_por_tipo = Obra.objects.values('tipo_obra').annotate(count=Count('id'))
        return Response(obras_por_tipo)


#Numero de usuarios por rol en cada obra, no en general

class UsuariosRolPorObra(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        obras = Obra.objects.all()
        data = []
        for obra in obras:
            personal_por_rol = Usuario.objects.filter(
                obrapersonal__id_obra=obra
            ).values('tipo_usuario').annotate(count=Count('id'))
            data.append({'obra': obra.nombre, 'personal_por_rol': personal_por_rol})
        return Response(data)

class ObrasMayorCantidadTareasFinalizadasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        obras = Obra.objects.annotate(
            num_tareas_finalizadas=Count('tareas', filter=Q(tareas__estado='aceptada'))
        ).order_by('-num_tareas_finalizadas')[:10]
        data = [{'nombre': obra.nombre, 'num_tareas_finalizadas': obra.num_tareas_finalizadas} for obra in obras]
        return Response(data)



class ObrasMenorCantidadTareasFinalizadasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        obras = Obra.objects.annotate(
            num_tareas_finalizadas=Count('tareas', filter=Q(tareas__estado='aceptada'))
        ).order_by('num_tareas_finalizadas')[:10]
        data = [{'nombre': obra.nombre, 'num_tareas_finalizadas': obra.num_tareas_finalizadas} for obra in obras]
        return Response(data)
