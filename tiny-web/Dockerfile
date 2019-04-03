# Base image from Alpine
FROM node:alpine

# this sets the working directory in the container
# any commands / instructions run after this are relative to this path
WORKDIR /scratch/node/tiny-web
# Install node and needed dependencies
COPY ./ ./
RUN npm install

# default startup command
CMD [ "npm", "start"]