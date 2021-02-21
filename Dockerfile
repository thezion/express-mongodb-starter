FROM node:12-alpine

WORKDIR /usr/src/app

EXPOSE 80

RUN apk add --no-cache bash git openssh

RUN git clone https://github.com/thezion/express-mongodb-starter.git .

CMD npm install && npm run serve:docker
