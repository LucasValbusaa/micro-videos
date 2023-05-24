#!/bin/bash

echo "###### Starting @core configs ######"
if [ ! -f "./src/@core/.env.test" ]; then
    cp ./src/@core/.env.test.example ./src/@core/.env.test
fi

echo "###### Starting nestjs configs ######"
if [ ! -f "./src/nestjs/envs/.env" ]; then
    cp ./src/nestjs/.env.example ./src/nestjs/.env

npm install

echo "###### Building @core ######"
npm run build -w @micro-videos/core

tail -f /dev/null
