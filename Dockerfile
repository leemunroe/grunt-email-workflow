FROM node:6.0.0

WORKDIR /app

ADD package.json /app/package.json
RUN npm install -g grunt-cli
RUN npm install

ADD grunt /app/grunt
ADD server.js /app/server.js

ADD Gruntfile.js /app/Gruntfile.js
RUN echo "{}" > /app/secrets.json

CMD ["grunt"]
