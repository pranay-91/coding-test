FROM node:14.0.0-alpine as dev-builder
WORKDIR /app
EXPOSE 8080
COPY . /app
RUN npm install
RUN npm run test
RUN npm build
ENTRYPOINT [ "npm", "start" ]

FROM node:14.0.0-alpine as prod-builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=prod

FROM node:14.0.0-alpine as prod
WORKDIR /app
EXPOSE 8080
COPY --from=prod-builder  /app/node_modules ./node_modules
COPY --from=dev-builder /app/dist ./dist
COPY --from=dev-builder /app/package.json  ./
USER 1000
ENTRYPOINT [ "npm", "start" ]