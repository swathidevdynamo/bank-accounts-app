# Dockerfile

# Stage 1: Build the React app
FROM node:latest AS build
WORKDIR /bank-accounts-app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the app with a simple web server
FROM node:latest
WORKDIR /bank-accounts-app
COPY --from=build /app/build ./build
COPY server.js ./
RUN npm install express
EXPOSE 3000
CMD ["node", "server.js"]