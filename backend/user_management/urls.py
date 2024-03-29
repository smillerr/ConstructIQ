from django.urls import path,include
from rest_framework import routers
from user_management import views

router=routers.DefaultRouter()
router.register(r'usuarios', views.UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls))
]