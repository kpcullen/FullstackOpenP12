FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:8080/api

RUN npm test

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/

EXPOSE 9080

CMD ["nginx", "-g", "daemon off;"]