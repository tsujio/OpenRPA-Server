FROM node:9.4

COPY . /openrpa-server

WORKDIR /openrpa-server

RUN npm install

ENV PORT 80

EXPOSE 80

CMD [ "npm", "start" ]
