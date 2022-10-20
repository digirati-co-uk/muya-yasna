# Muya/Yasna
Repository for the front and back ends of the MUYA project, called yasna throughout this codebase. 

## Introduction

The application comprises four main components:

1. The frontend user facing application (written in React / javascript)
2. A 5 hour video of the ritual (this is a static file and can be stored in an S3 bucket or similar location)
3. An API that provides data to the frontend (a Django application written in Python)
4. A relational database that stores the data used by the API (PostgreSQL)

N.B. The data set for the video bounding boxes is too large to store as a static file, or to query against easily in a frontend only static web application, so the Django application and RDBMS handles efficient access to this data via an API. This API exists purely to serve the Muya frontend application.

## Quickstart

There are three main ways that the Muya/Yasna service can be run.

1. _Purely locally_, that is with frontend, the APIs and the RDBMS all running locally.
2. _Hybrid_, that is with the frontend running locally, but connecting to a server for the APIs and data N.B. this is useful for rapid frontend development and how this repository was usually configured by default during the development life of the project
3.  _Fully remote_ and hosted on a server with the frontend, APIs and database running remotely, e.g. in a production or QA deployment in the cloud.

N.B. all of these scenarios assume web access to the video file (2) which is too large to store in this Git repository.

The current application on Digirati's QA server serves the video from: [https://ch-yasna-public.s3-eu-west-1.amazonaws.com/YASNA_2020_COLOUR-4K_H264.mp4](https://ch-yasna-public.s3-eu-west-1.amazonaws.com/YASNA_2020_COLOUR-4K_H264.mp4)

This file _can_ __and should__ be downloaded for rehosting elsewhere.

### Running locally with a local backend

The application can be brought up using `docker-compose` a standard tool which can spin up multiple [Docker](https://docs.docker.com/get-started/overview/) containers. 

The locally running application comprises two docker containers:

1. `django`: which serves up the frontend application and can provide the APIs 
2. `postgres`: which provides the PostgreSQL relational database backend for the API

Both containers are configured via [environment variables](https://en.wikipedia.org/wiki/Environment_variable).

The docker-compose file `docker-compose.yml` will spin up both the `django` container and the `postgres` database together, configured using these environment variables.

By default the environment variables are loaded from a file called `.env`

#### Step 1: Creating an `.env` file for local configuration
_By design_ we have not provided an `.env` file wihtin this repository and you should create one with your own secure username, password, and database details.

This file should follow the template below.

N.B. You will need to change the fields marked `<< changeme` below to set the database username and password. 

N.B. The database and user account will automatically be created on startup, so you can set the username, email, password and database name in the `.env` and they will be created automatically.

##### Typical env for local development

```.env
# General
# ------------------------------------------------------------------------------
USE_DOCKER=yes
IPYTHONDIR=/app/.ipython
MIGRATE=True
LOAD=True
TRANSLATE=True
DJANGO_DEBUG=False
WAITRESS=False
DJANGO_ADMIN=USERNAME << changeme
DJANGO_ADMIN_PASSWORD=PASSWORD << changeme
DJANGO_ADMIN_EMAIL=EMAIL << changeme
INIT_SUPERUSER=True

# PostgreSQL
# ------------------------------------------------------------------------------
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=PASSWORD << changeme
DATABASE_URL=postgres://postgres:PASSWORD@postgres:5432/postgres << changeme (the PASSWORD)
```

Once you have created your `.env` file you will be ready to build and start the service.

N.B. we have placed a copy of this template in the repository as `dot_env` which can be edited and then copied to `.env`.

#### Step 2: Starting the service

Starting the service is a two step process. The first will build the docker containers, and the second will srun the containers.

__A__: _Build the image_

`docker-compose -f docker-compose.yml build`

__B__: _Start the service_

`docker-compose -f docker-compose.yml up`


#### Step 3: Accessing the local service

When run locally using docker-compose, the frontend of the site will be available at: 

[http://localhost:8000/yasna](http://localhost:8000/yasna)

and the backend API that provides data to the frontend at: 

[http://localhost:8000/api/yasna/](http://localhost:8000/api/yasna/)

__Note on data__: When run locally for the first time, the `.env` file used should have `LOAD=True`, which will cause all yasna data to be loaded into the database from django fixtures. Subsequent runs should have `LOAD=False`, or the yasna data will be wiped and recreated from fixtures on container startup. There is no problem with wiping and recreating the data each time the Docker containers startup but it takes a few minutes so it is usually easier to set `LOAD=False` after the first run.


### Running locally with a remote backend

The application can be configured to use a remote backend for the APIs, in which case there are two hardcoded variables that may need to be changed in the frontend source code.

The api urls that the yasna FE interacts with are configured in [./yasna_frontend/src/api/endpoints.ts](yasna_frontend/src/api/endpoints.ts). 

If you wish to change the API endpoint to run a local frontend against a remote backend, change the value of `const baseUrl = 'http://localhost:8000/api/yasna';
` in `yasna_frontend/src/api/endpoints.ts` to point to the API endpoint URI.

See [Yasna Frontend config](#yasna-frontend-config) below for more information.

__N.B. if you change these values you must rebuild the containers above in order to deploy the changes.__

### Deploying to production

#### General note on deployment to production

This document cannot provide a detailed step by step guide for deployment as this is highly dependent on the infrastructure on which the site is to be hosted.

A typical approach, as used during the QA deployment of this site, might look like:

1. Update [./yasna_frontend/src/api/endpoints.ts](yasna_frontend/src/api/endpoints.ts) with the URL for the API endpoint
2. Run the `Dockerfile` (for the frontend and Django apps) on a cloud service such as Amazon AWS ECS
3. Configure the ECS service using environment variables in the ECS task definition to set the values for the location of the database backend, the hostname for the site, etc.
4. Configure an AWS RDS instance with a PostgreSQL database and set the environment variables for the ECS container to point to the correct address with the correct username and password
5. Upload the video file (see above) to an S3 bucket and set the value in [./yasna_frontend/src/components/VideoPlayer/sources.ts](yasna_frontend/src/components/VideoPlayer/sources.ts) to point to the correct video file URL.

In the case of the Digirati QA deployment, Terraform was used to manage the infrastructure as code, and Github actions were setup to automatically bounce the site with an update version when code updates were merged into specific protected branches. Details such as this are very specific to the hosting solution chosen.

We would be happy to answer questions when the time comes to deploy the site to production.

#### Configuration for production

There are a number of changes that __must__ be made when deploying to production.

1. The location of the API endpoint URL must be set in [./yasna_frontend/src/api/endpoints.ts](yasna_frontend/src/api/endpoints.ts)
2. The location of the video file must be set in [./yasna_frontend/src/components/VideoPlayer/sources.ts](yasna_frontend/src/components/VideoPlayer/sources.ts)
3. A `CANONICAL_HOSTNAME` environment variable must be set the correct scheme and hostname for the hosted site. This is not present in the `.env` file for local use, as the system will default to a local location if it is not set. 
4. Other environment variables passed into the running container must be set to the correct local, port, username and password for the PostgreSQL database instance.

N.B. `CANONICAL_HOSTNAME` Defaults to `http://127.0.0.1:8000` when not set for local testing, but must be set for the deployed site to allow for the generation of correct canonical urls. Must be a string including the scheme and hostname. 

## Additional Developer Notes


### Running tests

The [tests](tests) directory contains tests which use pytest-docker to spin up an instance of the site.

The [pytest_requirements.txt](tests/pytest_requirements.txt) are the dependencies to run these tests (n.b. distinct from the app requirements) and need to be installed locally in the Python environment being used to run the tests. 

To run all the tests: 
```
cd ./tests/
pytest
```
To run an individual test file: 
```
cd ./tests/
pytest ./test_muya_iiif_store.py
```

### Generating Yasna versioned fixture data

The data loaded into the Django instance is provided by fixture files in the `/app/yasna/data` folder within this repository.

To update the encyclopaedia entries from the source spreadsheet and images: 

```
python3 ./scripts/yasna_xls_to_fixtures PATH_TO_XLS_FILE ./app/media/yasna_object_images/ ./yasna/data/
```

Images for the encyclopaedia are stored as part of this codebase/the resulting docker image, any changes to images should be made in the `app/media/yasna_object_images/` directory before the fixtures are generated from the `.xls` file. 


The `eaf_fixtures.json` fixtures file can be generated from the EAF file containing the video transcription data with the `yasna_eaf_to_fixtures.py` script, e.g.: 

```
python3 ./scripts/yasna_eaf_to_fixtures.py PATH_TO_EAF_FILE ./muya_discovery/yasna/data/eaf_fixtures.json
```

N.B. Data for the object tracking in the video (bounding boxes, etc.) are stored in highly compressed [Apache Avro](https://avro.apache.org/docs/1.2.0/) files to allow fast and efficient loading of the data. [Avro](https://avro.apache.org/docs/1.2.0/) is used because the original .txt files are collectively too large—even if compressed—and too numerous to store in a standard Git repository. 

Additionally, the Avro files contain normalised frame data so that bounding boxes that repeat unchanged across multiple video frames do not have to be repeated for additional storage/ingest efficiency.

### Yasna Frontend config

The yasna frontend react application has hardcoded urls for configuration, that will require a rebuild of the container to apply. 

The api urls that the yasna FE interacts with are configured in [./yasna_frontend/src/api/endpoints.ts](yasna_frontend/src/api/endpoints.ts). 

The source of the video is set in [./yasna_frontend/src/components/VideoPlayer/sources.ts](yasna_frontend/src/components/VideoPlayer/sources.ts). 

### Navigating to the top level APIs

Go to:

[http://localhost:8000/api/](http://localhost:8000/api/)