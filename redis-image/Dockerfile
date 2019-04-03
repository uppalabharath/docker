# Base Image
FROM alpine

# Install / Configure Components or Dependencies
RUN apk add --update redis
RUN apk add --update gcc
RUN apk add --update python

# specify the startup command
CMD ["redis-server"]