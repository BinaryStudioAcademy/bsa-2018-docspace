FROM node:8

WORKDIR /docspace

RUN npm i nodemon -g
COPY package.json yarn.lock /docspace/
RUN yarn
COPY client /docspace/client/
RUN ls
RUN cd client && yarn add node-sass

CMD ["yarn", "dev"]

EXPOSE 3000