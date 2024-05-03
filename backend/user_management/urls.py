from django.urls import path,include
from rest_framework import routers
from user_management import views

router=routers.DefaultRouter()
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'obras', views.ObraViewSet)

urlpatterns = [
    path('', include(router.urls))
]
