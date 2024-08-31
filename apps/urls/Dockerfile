FROM node:20-bullseye-slim

COPY . /usr/src

WORKDIR /usr/src

RUN yarn
RUN yarn build urls

EXPOSE 3000

CMD node dist/apps/urls/main