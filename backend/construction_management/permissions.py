from rest_framework import permissions

class UserTypePermission(permissions.BasePermission):

    def has_permission(self, request, view):
        user = request.user
        
        if request.method in permissions.SAFE_METHODS:
            return True

        # Check if user is a manager, site manager, or foreman
        allowed_user_types = ['Gerente', 'Director de obra']
        if user.tipo_usuario in allowed_user_types:
            return True
        
        return False
