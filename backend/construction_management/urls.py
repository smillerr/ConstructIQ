from django.urls import path,include
from rest_framework import routers
from construction_management import views

router=routers.DefaultRouter()
router.register(r'obras', views.ObraViewSet)

urlpatterns = [
    path('', include(router.urls))
]