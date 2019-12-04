

build:
	docker-compose build

run:
	docker-compose run hub bash

up:
	docker-compose up


push:
	docker build -t werty1st/espruinohub -f docker/Dockerfile . && docker push werty1st/espruinohub