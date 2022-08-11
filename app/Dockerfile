FROM node as build
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

FROM nginx
COPY --from=build /app/build/ /usr/share/nginx/html
