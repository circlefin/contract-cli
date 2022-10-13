FROM node:16

RUN apt update
RUN apt install wget

RUN yes | apt install openjdk-11-jdk

RUN yes | apt install python3-dev
RUN yes | apt install python3-pip

COPY . /usr/source/contractcli
