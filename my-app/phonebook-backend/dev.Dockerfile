FROM node:20

WORKDIR /usr/src/app

COPY package* .

COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ] 