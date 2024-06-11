* Correr otra vez esto: 
	 ```pip install -r requirements.txt```


* Crear archivo firebase_credentials.json en directorio backend y agregarle esto: 


* Exportar variable de entorno con credenciales de google: 
	* Windows:
	```$Env:GOOGLE_APPLICATION_CREDENTIALS="dirección "```
	* Linux:
	```export GOOGLE_APPLICATION_CREDENTIALS='firebase_credentials.json'```

* Correr server


# Backend Setup

This guide will walk you through the steps to set up the backend for ConstructIQ.

## Prerequisites

Before proceeding, make sure you have the following installed on your system:

- Python 3.10.x

## Installation

Once you are inside the backend folder, run this command on a terminal.

```bash
pip install requirements.txt
```

This will install all dependencies needed for running the backend

Then, you'll need to create a .env file inside the backend folder

```bash
touch .env
```

Open the file on your code editor and copy the content of the "env" file inside the backend folder

Open another terminal and connect to PostgreSQL with your preferred user

```bash
psql -U your-user
```

Prompt your user password and create a empty database

```bash
create database your-db-name;
```

Exit the psql terminal

```bash
\q
```

Now open the .env file that you created before and start replacing the parameters with the ones of the database you created

## DJANGO_DB_NAME

## DJANGO_DB_USER

## DJANGO_DB_PASSWORD

## DJANGO_DB_HOST

## DJANGO_DB_PORT

Save changes and go to another terminal and run this command:

```bash
python manage.py makemigrations
```

After that, on the same terminal run this command:

```bash
python manage.py migrate
```

In case you later want to access the django admin dashboard, create a superuser

```bash
python manage.py createsuperuser
```

Now that you ran the migrations and have everything up to date, start the server:

```bash
python manage.py runserver
```

You can now go to the [localhost](http://127.0.0.1:8000/docs) and see the API documentation.
