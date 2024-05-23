python manage.py makemigrations
python manage.py migrate
DJANGO_SUPERUSER_PASSWORD=test123 python3 manage.py createsuperuser --login test --nombre test --apellido gerente --tipo_identificacion Cedula --numero_identificacion "123456789" --tipo_usuario Gerente  --no-input
python manage.py runserver 0.0.0.0:8000
