# Evaluate App

## Overview
This repository contains both frontend and backend codebases, each within their respective directories. 

## Instructions
Each folder has its own `README.md` file, refer them for development and deployment instructions.

## Local Database in Docker
To run postgres db in local docker container
- Create .env file in project root i.e same place as docker-compose.yml file
- Add below values in the .env file
    - POSTGRES_USER
    - POSTGRES_PASSWORD
    - POSTGRES_DB
- Run `docker compose up -d`