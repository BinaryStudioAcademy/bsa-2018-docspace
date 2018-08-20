FROM node:8
ENV NODE_ENV production
ENV PORT 8080
ENV NODE_PATH ./
WORKDIR /docspace

COPY package.json yarn.lock /docspace/
RUN yarn
COPY client /docspace/client/
COPY server /docspace/server/
RUN cd client && yarn cache clean && yarn add --force node-sass@latest


CMD ["yarn", "prod"]

EXPOSE 8080