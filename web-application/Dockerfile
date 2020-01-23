FROM node:13.7.0

EXPOSE 8080

WORKDIR /.

COPY package*.json ./

RUN npm install

COPY src src

CMD ["npm", "run", "start"]