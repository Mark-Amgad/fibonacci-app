# Dockerized Node.js, Redis, PostgreSQL, Next.js, and Nginx Setup

This project aims to provide a Dockerized development and production environments for running multiple services including Node.js servers, Redis, PostgreSQL, Next.js, and Nginx server. The setup utilizes Docker and Docker Compose for containerization and orchestration.

The project functionalities don't require all of these services, but the purpose of the project is to
practice docker.

## Services included

1. Backend server (Nodejs-express)
2. Worker server (Nodejs-express)
3. Postgres-db
4. redis-server
5. client (Nextjs app)
6. Nginx server (to serve client in production environment)

## Development Diagram

![Services diagram](dev.png)

## Production Diagram

![Services diagram](prod.png)

## Run steps:

1. Clone the project.
2. Change your directory to the application folder `cd fibonacci-app`
3. Make sure that your machine has docker and docker-compose setup.
4. RUN `docker-compose -f docker-compose-prod.yml up`
5. ping http://localhost on your browser.
