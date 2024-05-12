python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser --username gabe --nombre gerente --apellido gerente --tipo_identificacion Cedula --numero_identificacion "123456789" --password test123 --tipo_usuario Gerente  --no-input
python manage.py runserver 0.0.0.0:8000
