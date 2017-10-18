FROM node:8

RUN mkdir /cryptobal

WORKDIR /cryptobal
ADD package.json /cryptobal/package.json
RUN npm install

EXPOSE 8888