#!/bin/bash

docker-compose --env-file ./config/.prod.development -f docker-compose.prod.yaml build && docker-compose -f docker-compose.prod.yaml up