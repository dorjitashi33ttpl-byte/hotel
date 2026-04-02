FROM node:18-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# In production, use custom nginx.conf for SPA routing
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
