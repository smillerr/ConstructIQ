#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from django.contrib.auth import get_user_model

def create_superuser():
    User = get_user_model()
    try:
        user = User.objects.create_superuser(
            login='your_login',
            nombre='your_name',
            apellido='your_last_name',
            tipo_identificacion='your_id_type',
            numero_identificacion='your_id_number',
            tipo_usuario='your_user_type',
            password='your_password'
        )
        print('Superuser created successfully.')
    except Exception as e:
        print(f'Error creating superuser: {e}')

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main_module.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
