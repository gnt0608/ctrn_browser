FROM node:21

RUN apt upgrade && apt update && apt install -y wine

WORKDIR /app

ENTRYPOINT [ "/bin/bash" ]
