FROM node:8.6.0
ENV NODE_ENV local
WORKDIR /meadowlark
COPY package.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 9000 5858
CMD ["node", "server/index.js"]
