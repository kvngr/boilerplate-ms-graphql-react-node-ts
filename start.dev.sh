#!/bin/bash

docker-compose --env-file ./config/.env.development -f docker-compose.dev.yaml build && docker-compose -f docker-compose.dev.yaml up