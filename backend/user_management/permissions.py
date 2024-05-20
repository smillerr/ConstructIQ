from rest_framework import permissions

class UserTypePermission(permissions.BasePermission):

    def has_permission(self, request, view):
        user = request.user

        if user.is_superuser:
            return True

        # Check user type and return True/False
        if user.tipo_usuario == 'Gerente':
            return True
        
        return False