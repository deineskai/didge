# Stage 1: Build
FROM node:20 AS build-stage

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm install

# Build
ARG BUILD_ENV=production
COPY . .
RUN npm run build -- --configuration ${BUILD_ENV}

# Stage 2: Serve
FROM nginx:stable-alpine

# Cioy
COPY --from=build-stage /app/dist/didge-frontend/browser /usr/share/nginx/html

# Optional nginx config for angular (SPA Routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]