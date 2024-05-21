from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):

    def create_user(self, login, nombre, apellido, tipo_identificacion, numero_identificacion, tipo_usuario, genero, direccion, celular, password=None):
        if not login:
            raise ValueError('Users must have a login')

        user = self.model(
            login=login,
            nombre=nombre,
            apellido=apellido,
            tipo_identificacion=tipo_identificacion,
            numero_identificacion=numero_identificacion,
            tipo_usuario=tipo_usuario,
            genero=genero,
            direccion=direccion,
            celular=celular,
            password=password,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, login, nombre, apellido, tipo_identificacion, numero_identificacion, tipo_usuario, password):
        user = self.create_user(
            login=login,
            password=password,
            nombre=nombre,
            apellido=apellido,
            tipo_identificacion=tipo_identificacion,
            numero_identificacion=numero_identificacion,
            tipo_usuario=tipo_usuario,
            genero="superuser",
            direccion="superuser",
            celular="superuser",
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user