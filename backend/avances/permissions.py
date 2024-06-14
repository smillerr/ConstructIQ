from rest_framework import permissions

class AdvancementTypePermission(permissions.BasePermission):

    def has_permission(self, request, view):
        user = request.user
        
        if request.method in permissions.SAFE_METHODS:
            return True

        # Check user type and return True/False
        if user.tipo_usuario == 'Capataz de obra': 
            return True
        
        return False
