FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["app/package.json", "app/package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY ./app .
EXPOSE 3000
CMD ["npm", "start"]