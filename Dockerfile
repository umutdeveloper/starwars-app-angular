# Use an official node image as the base image
FROM node:20.15.1-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Add chromium for unit testing
RUN apk add chromium
RUN apk add chromium-chromedriver
ENV CHROME_BIN=/usr/bin/chromium-browser

# Build the application
RUN npm run build:docker

# Use a lightweight web server to serve the built application
FROM nginx:stable-alpine

# Copy the built application from the previous stage
COPY --from=build /app/dist/browser /usr/share/nginx/html

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the application
CMD ["nginx", "-g", "daemon off;"]
