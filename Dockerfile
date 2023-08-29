# set the base image to build from 
FROM node:alpine
# set the working directory
WORKDIR /app
# copy package files
COPY package.json ./
COPY package-lock.json ./
# install dependencies
RUN npm install

ARG REACT_APP_USER_SERVICE_PATH

ENV REACT_APP_USER_SERVICE_PATH $REACT_APP_USER_SERVICE_PATH

# copy everything to /app directory
COPY ./ ./
EXPOSE 3000

# run the app
CMD ["npm", "start"]