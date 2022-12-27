FROM --platform=linux/amd64 node:alpine
WORKDIR /usr/app
COPY . .
RUN npm install
ENTRYPOINT ["npm", "start"]