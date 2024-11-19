FROM node:16-slim

WORKDIR /usr/src/app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    g++ \
    golang \
    ruby \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Verify the build output exists
RUN ls -la dist/

EXPOSE 5002

# Use node directly instead of npm
CMD ["node", "dist/server.js"] 