#Base Image
FROM node:alpine
#WORKDIR
WORKDIR /scratch/node/tiny-web2

COPY ./package.json ./
#Deps install
RUN npm install

COPY ./ ./

#startup command
CMD [ "npm", "start" ]