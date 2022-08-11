FROM node as build
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . ./
RUN npm run build

FROM nginx
COPY --from=build /app/build/ /usr/share/nginx/html
