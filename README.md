# Muya Discovery
Repository for Muya Discovery Proto project

To run this locally, you will generally need to create a `.env` file (named `.env`) which the 
docker-compose file will use.

You will need to change the fields marked `<< changeme` below.

## Typical env for local development

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

`CANONICAL_HOSTNAME` Defaults to `http://127.0.0.1:8000` when not set for local testing, but must be set for the deployed site to allow for the generation of correct canonical urls. Must be a string including the scheme and hostname. 

## Starting the service

Build the image

`docker-compose -f docker-compose.yml build`

Start the service without django-q

`docker-compose -f docker-compose.yml up`

Start the service with django-q

`docker-compose -f docker-compose.yml -f docker-compose.worker.yml up`


## Running tests

The [tests](tests) directory contains tests which use pytest-docker to spin up an instance of the site.
The [pytest_requirements.txt](tests/pytest_requirements.txt) are the dependencies to run these tests (n.b. distinct from the app requirements) and need to be installed locally. 
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


## Navigating to the top level APIs

Go to:

[http://localhost:8000/api/](http://localhost:8000/api/)

## Generating Yasna versioned fixture data

The `eaf_fixtures.json` fixtures file can be generated from the EAF file containing the video transcription data with the `yasna_eaf_to_fixtures.py` script, e.g.: 
```
python3 ./scripts/yasna_eaf_to_fixtures.py PATH_TO_EAF_FILE ./muya_discovery/yasna/data/eaf_fixtures.json
```

## Yasna Frontend config

The yasna frontend react application has hardcoded urls for configuration, that will require a rebuild of the container to apply. 

The api urls that the yasna FE interacts with are configured in [./yasna/src/api/endpoints.ts](yasna/src/api/endpoints.ts). 

The source of the video is set in [./yasna/src/components/VideoPlayer/sources.ts](yasna/src/components/VideoPlayer/sources.ts). 
