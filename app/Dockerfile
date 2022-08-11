FROM node:16.16

WORKDIR /usr/src/app

# Bundle/Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "start"]