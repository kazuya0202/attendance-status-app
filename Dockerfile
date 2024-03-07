FROM node:20
WORKDIR /attendance-status-app
COPY package.json yarn.lock .
RUN yarn
COPY . .
CMD yarn debug
