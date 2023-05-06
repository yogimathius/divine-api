# Use NodeJS image as the base image
FROM node:14

# Set working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code to container
COPY . .

# Expose port 3000 for the container to listen on
EXPOSE 3000

# Start the app when the container is run
CMD ["npm", "run", "start:prod"]
