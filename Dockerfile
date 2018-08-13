FROM node:8
ENV NODE_ENV production
WORKDIR /docspace

RUN npm i nodemon -g
COPY package.json yarn.lock /docspace/
RUN yarn
COPY client /docspace/client/
COPY server /docspace/server/
RUN ls
RUN cd client && yarn add node-sass

CMD ["yarn", "prod"]

EXPOSE 3001