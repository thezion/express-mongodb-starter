# express-mongodb-starter

## Local development with docker

```
# spin up container
docker run -d -t --name express-mongodb-starter -p 80:80 -v ${PWD}:/app node:12-slim

# log into the container
docker exec -it express-mongodb-starter /bin/bash
npm install -g nodemon ts-node
npm run dev
```
