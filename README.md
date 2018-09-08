# Chattium

Chattium is a tiny chatroom PWA powered by socket.io and create-react-app


## Quick Run in Docker Container

```bash
docker run --rm -d -p 3000:3000 liuderchi/chattium:latest
```

Now you can go to `locaohost:3000` in browser


## Run Locally for Development

```sh
git clone https://github.com/liuderchi/chattium.git
cd chattium

// 1. start server
npm i && npm run start:watch

// 2. open another terminal, start client
cd client; yarn && yarn run start
```

Now you can go to `locaohost:3001` in browser


## Develop in Docker Container

1. Clone and run the container

```bash
git clone https://github.com/liuderchi/chattium.git
cd chattium
docker run -it --rm -d \
  -p 3000:3000 -p 3001:3001 \
  -v $PWD:/root/chattium \
  liuderchi/chattium:raw-env-node-yarn
```

2. start the server in bash

```bash
docker exec -it MYCONTAINER sh
~/chattim $ npm i && npm run start:watch
```

3. start the client dev server in bash

```bash
docker exec -it MYCONTAINER sh
~/chattium $ cd client
~/chattium/client $ yarn && yarn run start
```

Now you can go to `locaohost:3001` in browser


## Deploy with [Now CLI](https://github.com/zeit/now-cli)

```sh
cd client && \
  yarn run build:now && \
  rm build/static/js/*.map
cd ../ && now
```