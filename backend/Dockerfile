FROM python:3.11.9-alpine3.19

RUN apk update && apk add libpq-dev nginx curl
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install -r requirements.txt
ENV DJANGO_DB_NAME="constructiq"
ENV DJANGO_DB_USER="constructiq_owner"

ENV DJANGO_DB_PORT="5432"
ENV DEBUG="True"
ENV ALLOWED_HOSTS="localhost,127.0.0.1,0.0.0.0"
COPY . .

EXPOSE 8000
CMD ["sh", "./setup.sh" ]