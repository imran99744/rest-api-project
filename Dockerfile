FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy app source
COPY . .

# Create non-root user
RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -D appuser && \
    chown -R appuser:appgroup /app

USER appuser

# Default environment variables
ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "dev"]