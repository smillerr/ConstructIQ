from django.urls import path, include
from rest_framework import routers
from .views import UserRoleStatsView, ObrasCompletarMasRapidoView, ObrasMayorRetrasoView, ObrasMayorCantidadPersonalView
from construction_management import views

router = routers.DefaultRouter()
router.register(r'obras', views.ObraViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user-role-stats/', UserRoleStatsView.as_view(), name='user-role-stats'),
    path('obras-completar-mas-rapido/', ObrasCompletarMasRapidoView.as_view(), name='obras-completar-mas-rapido'),
    path('obras-mayor-retraso/', ObrasMayorRetrasoView.as_view(), name='obras-mayor-retraso'),
    path('obras-mayor-cantidad-personal/', ObrasMayorCantidadPersonalView.as_view(), name='obras-mayor-cantidad-personal'),
]
