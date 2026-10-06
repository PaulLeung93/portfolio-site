# Stage 1: Build the React Application
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files first to leverage cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your source code
COPY . .

# Build the project (creates the /dist folder)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Cloud Run expects the container to listen on port 8080
ENV PORT=8080

# Copy the build output from Stage 1 to Nginx's html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx config (we will create this in Step 2)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]