FROM node:16

RUN apt update
RUN yes | apt install openjdk-11-jdk
