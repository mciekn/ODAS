ARG TARGET_PLATFORM
FROM --platform=${TARGET_PLATFORM} node:alpine
WORKDIR /usr/app
COPY . .
RUN npm install
EXPOSE 8080
ENTRYPOINT ["npm", "start"]
