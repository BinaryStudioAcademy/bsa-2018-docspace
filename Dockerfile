FROM node:8
ENV NODE_ENV production
ENV NODE_PATH ./
WORKDIR /docspace

COPY package.json yarn.lock /docspace/
RUN yarn
COPY client /docspace/client/
COPY server /docspace/server/
RUN cd client && yarn add node-sass
RUN yarn client-build && cd ..


CMD ["yarn", "prod"]

EXPOSE 3001