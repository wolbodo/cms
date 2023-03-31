FROM node:18-alpine


WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm ci

CMD npm run start
