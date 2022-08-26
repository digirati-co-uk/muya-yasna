# Muya Yasna
Repository for the front and back ends of the MUYA project, called yasna throughout this codebase. 

When run locally using docker-compose, the frontend of the site will be available at: 

[http://localhost:8000/yasna](http://localhost:8000/yasna)

and the backend API that provides data to the frontend at: 

[http://localhost:8000/api/yasna/](http://localhost:8000/api/yasna/)

When run locally for the first time, the `.env` file used should have `LOAD=True`, which will cause all yasna data to be loaded into the database from django fixtures. Subsequent runs should have `LOAD=False`, or the yasna data will be wiped and recreated from fixtures on container startup. 

n.b. When run locally the FE does not use the local backend as the source of data, as the FE codebase has both API and video urls hardcoded. See note on FE config below. 

## Running locally
To run this locally, you will generally need to create a `.env` file (named `.env`) which the 
docker-compose file will use.

You will need to change the fields marked `<< changeme` below.

### Typical env for local development

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

### Starting the service

Build the image

`docker-compose -f docker-compose.yml build`

Start the service

`docker-compose -f docker-compose.yml up`


### Running tests

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


### Navigating to the top level APIs

Go to:

[http://localhost:8000/api/](http://localhost:8000/api/)

## Generating Yasna versioned fixture data

To update the encyclopaedia entries from the source spreadsheet and images: 
```
python3 ./scripts/yasna_xls_to_fixtures PATH_TO_XLS_FILE ./app/media/yasna_object_images/ ./yasna/data/

```
Images for the encyclopaedia are stored as part of this codebase/the resulting docker image, any changes to images should be made in the `app/media/yasna_object_images/` directory before the fixtures are generated from the xls file. 


The `eaf_fixtures.json` fixtures file can be generated from the EAF file containing the video transcription data with the `yasna_eaf_to_fixtures.py` script, e.g.: 
```
python3 ./scripts/yasna_eaf_to_fixtures.py PATH_TO_EAF_FILE ./muya_discovery/yasna/data/eaf_fixtures.json
```

## Yasna Frontend config

The yasna frontend react application has hardcoded urls for configuration, that will require a rebuild of the container to apply. 

The api urls that the yasna FE interacts with are configured in [./yasna/src/api/endpoints.ts](yasna/src/api/endpoints.ts). 

The source of the video is set in [./yasna/src/components/VideoPlayer/sources.ts](yasna/src/components/VideoPlayer/sources.ts). 
