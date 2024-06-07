from rest_framework.views import APIView
from rest_framework.response import Response
from user_management.models import Usuario  
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated
from construction_management.models import Obra, ObraPersonal
from django.db.models import Count, F, ExpressionWrapper, fields

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
        ).order_by('tiempo_restante')[:10]  # Las 10 obras que se deben completar más rápido
        data = [{'nombre': obra.nombre, 'tiempo_restante': obra.tiempo_restante} for obra in obras]
        return Response(data)

class ObrasMayorRetrasoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        obras = Obra.objects.filter(activo=True).annotate(
            retraso=ExpressionWrapper(F('fecha_final') - F('fecha_inicio'), output_field=fields.DurationField())
        ).order_by('-retraso')[:10]  # Las 10 obras con mayor retraso
        data = [{'nombre': obra.nombre, 'retraso': obra.retraso} for obra in obras]
        return Response(data)

class ObrasMayorCantidadPersonalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        obras = Obra.objects.filter(activo=True).annotate(
            num_personal=Count('obrapersonal')
        ).order_by('-num_personal')[:10]  # Las 10 obras con mayor cantidad de personal
        data = [{'nombre': obra.nombre, 'num_personal': obra.num_personal} for obra in obras]
        return Response(data)
