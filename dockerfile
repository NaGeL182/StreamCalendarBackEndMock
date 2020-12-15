FROM ubuntu:20.04

RUN apt-get update && apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs \
    && npm install -g nodemon
RUN mkdir /workspace
WORKDIR /workspace
CMD nodemon index.js
