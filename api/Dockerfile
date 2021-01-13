FROM node:14.15.1

WORKDIR /usr/api

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE ${API_PORT}

CMD npm run build