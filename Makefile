

build:
	docker-compose build

run:
	docker-compose run hub bash

up:
	docker-compose up


push: build
	docker-compose build push