FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env .env

RUN npm install -g coffee-script

EXPOSE 9001

CMD ["coffee", "server.coffee"]
