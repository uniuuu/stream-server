#FROM node:7-alpine
FROM node:8.9-alpine

RUN apk add --update \
libc6-compat

WORKDIR /usr/src/app
COPY . .
RUN npm install


# Expose and entrypoint
#COPY entrypoint.sh /
#RUN chmod +x /entrypoint.sh
#VOLUME /usr/src/app/config
EXPOSE 81/TCP
#ENTRYPOINT ["/entrypoint.sh"]
CMD [ "npm", "start" ]

