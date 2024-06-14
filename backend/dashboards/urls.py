from django.urls import path, include
from rest_framework import routers
from .views import UserRoleStatsView, ObrasCompletarMasRapidoView, ObrasMayorRetrasoView, ObrasMayorCantidadPersonalView
from construction_management import views
from .views import NumeroObrasPorTipoView
from .views import UsuariosRolPorObra
from .views import ObrasMayorCantidadTareasFinalizadasView
from .views import ObrasMenorCantidadTareasFinalizadasView


router = routers.DefaultRouter()
router.register(r'obras', views.ObraViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user-role-stats/', UserRoleStatsView.as_view(), name='user-role-stats'),
    path('obras-completar-mas-rapido/', ObrasCompletarMasRapidoView.as_view(), name='obras-completar-mas-rapido'),
    path('obras-mayor-retraso/', ObrasMayorRetrasoView.as_view(), name='obras-mayor-retraso'),
    path('obras-mayor-cantidad-personal/', ObrasMayorCantidadPersonalView.as_view(), name='obras-mayor-cantidad-personal'),
    path('numero-obras-por-tipo/', NumeroObrasPorTipoView.as_view(), name='numero-obras-por-tipo'),
    path('usuarios-rol-por-obra/', UsuariosRolPorObra.as_view(),  name='usuarios-rol-por-obra'),
    path('usuarios-rol-por-obra/', UsuariosRolPorObra.as_view(),  name='usuarios-rol-por-obra'),
    path('obras-mayor-cantidad-tareas-finalizadas/', ObrasMayorCantidadTareasFinalizadasView.as_view(), name='obras-mayor-cantidad-tareas-finalizadas'),
    path('obras-menor-cantidad-tareas-finalizadas/', ObrasMenorCantidadTareasFinalizadasView.as_view(), name='obras-menor-cantidad-tareas-finalizadas')

]
