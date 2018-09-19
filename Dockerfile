FROM node:10-alpine
LABEL maintainer="TE-CHI LIU"

RUN apk update && apk upgrade
RUN apk add yarn

ENV workdir /root/chattium
ENV devServerPort 3001
ENV serverPort 3000

# NOTE to edit files in host, do
# $ docker run -v "$PWD":/root/chattium [other options...]

# NOTE to edit files in container, uncomment this:
# ADD . ${workdir}

WORKDIR ${workdir}

EXPOSE ${devServerPort}
EXPOSE ${serverPort}
