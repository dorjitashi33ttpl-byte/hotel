FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Mobile apps are usually built for stores, but for a web-preview or dev-server:
CMD ["npm", "start"]
