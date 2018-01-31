FROM node:9.4

ARG HTTP_PROXY=""

ARG HTTPS_PROXY=""

RUN if [ -n "$HTTP_PROXY" ]; then npm -g config set proxy "$HTTP_PROXY"; fi

RUN if [ -n "$HTTPS_PROXY" ]; then npm -g config set https-proxy "$HTTPS_PROXY"; fi

RUN npm -g config set registry http://registry.npmjs.org/

COPY . /openrpa-server

WORKDIR /openrpa-server

RUN npm install

RUN npm run build

ENV PORT 80

EXPOSE 80

CMD [ "npm", "start" ]
