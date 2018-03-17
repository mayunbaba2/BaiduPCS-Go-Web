FROM node:8
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm run build
RUN rm -rf ./build
RUN rm -rf ./test
RUN rm -rf ./src

ENV PORT=80
ENV CORS=0
CMD [ "npm", "start" ]
