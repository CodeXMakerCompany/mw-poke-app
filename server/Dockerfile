FROM node:22.13.1-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install ts-node

COPY . .

EXPOSE 8000

CMD ["npm","run","dev"]
