# Use the official Node.js 18 image as the base image
FROM node:20

# Create and set the app directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (should match the one defined in docker-compose.yml)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
