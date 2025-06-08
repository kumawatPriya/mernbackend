# Stage 1: Base image with Node.js
FROM node:18-alpine as base

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have it)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy rest of your backend source code
COPY . .

# Expose the port your Node.js server will run on
EXPOSE 5000  # <-- change it if your server uses a different port

# Set environment variables if needed
# ENV NODE_ENV=production

# Start the Node.js server
CMD ["node", "index.js"]
# or if you use something like "npm start"
# CMD ["npm", "start"]
