# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm install

# Copy app source
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3434

# Command to run the application
CMD ["npm", "run", "start"]