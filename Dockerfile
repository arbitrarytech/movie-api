FROM node

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install

EXPOSE 8000

CMD [ "npm", "start" ]
