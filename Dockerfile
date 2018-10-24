FROM node:8.12-alpine
COPY . code
WORKDIR /code
RUN npm install
RUN npm run build

