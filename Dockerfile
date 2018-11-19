FROM node:dubnium-alpine 

COPY . /app
WORKDIR /app

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD yarn start -p 3000 -d False -i False