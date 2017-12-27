FROM node:carbon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 8001
CMD [ "npm", "start" ]