FROM node:14.21

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

RUN npm uninstall bcrypt

RUN npm audit fix

RUN npm install bcrypt

CMD ["npm", "start"]



