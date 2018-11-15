FROM node:8.11.4

ENV app_path /var/www/vue_channels

WORKDIR $app_path

COPY package.json $app_path
COPY package-lock.json $app_path

RUN npm install

COPY . $app_path

RUN npm run build