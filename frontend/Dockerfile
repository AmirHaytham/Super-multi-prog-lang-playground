FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Environment variables
ENV NODE_ENV=development
ENV REACT_APP_API_URL=http://localhost:5007
ENV WDS_SOCKET_PORT=0
ENV CHOKIDAR_USEPOLLING=true

# Install dependencies
RUN npm install

# Copy source code
COPY . .

EXPOSE 3000

CMD ["npm", "start"] 