FROM node:9.4

ARG HTTP_PROXY=""

ARG HTTPS_PROXY=""

RUN npm -g config set proxy $HTTP_PROXY && \
    npm -g config set https-proxy $HTTPS_PROXY && \
    npm -g config set registry http://registry.npmjs.org/

COPY . /openrpa-server

WORKDIR /openrpa-server

RUN npm install

ENV PORT 80

EXPOSE 80

CMD [ "npm", "start" ]
