FROM node:13.7.0

EXPOSE 3030

WORKDIR /single-page-application/

COPY package*.json ./

RUN npm install

COPY src src

CMD ["npm", "run", "start"]