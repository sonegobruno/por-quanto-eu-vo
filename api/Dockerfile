FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "typeorm", "migration:run"]
CMD ["npm", "run", "dev"]
