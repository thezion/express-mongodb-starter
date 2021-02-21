FROM node:12-alpine

RUN apk add --no-cache bash git openssh

WORKDIR /usr/src/app

RUN git clone https://github.com/thezion/express-mongodb-starter.git .

CMD npm install && npm run serve:docker

EXPOSE 80
