FROM node:22-alpine

COPY . /usr/src

WORKDIR /usr/src

RUN npm install
RUN npm run build urls

EXPOSE 3000

CMD node dist/apps/urls/main