FROM node:carbon

# Create application directory
WORKDIR /usr/src/app

# Install application dependencies
COPY package*.json ./
RUN npm install

# Bundle application source
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the application
CMD npm run prod
