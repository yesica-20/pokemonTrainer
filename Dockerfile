# Use the latest version of the official Node.js image as the base image
FROM node:alpine as build

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies based on package-lock.json
RUN npm ci

# Build the application
RUN npm run build

# Use the latest version of the official Nginx image as the base image
FROM nginx:latest

# Copy custom nginx configuration file to the container at the default nginx configuration location
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built application from the build stage to the nginx html directory
COPY --from=build /app/dist/nginx-example-app /usr/share/nginx/html
