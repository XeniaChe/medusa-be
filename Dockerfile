FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install global add @medusajs/medusa-cli@latest

COPY . .
EXPOSE 9000
CMD npx medusa migrations run && npm run start