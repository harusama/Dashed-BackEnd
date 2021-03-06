FROM node:8.11.1
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install && yarn cache clean