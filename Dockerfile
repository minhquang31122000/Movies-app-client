# Stage 1: Build the React app
FROM node:20.18.0 AS build

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

ARG REACT_APP_API_SERVICE_URL

# Sử dụng build argument làm biến môi trường
ENV REACT_APP_API_SERVICE_URL=$REACT_APP_API_SERVICE_URL

# Build the app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
