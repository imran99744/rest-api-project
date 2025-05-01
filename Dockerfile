FROM node:20-slim

WORKDIR /app

RUN groupadd -r appuser && useradd -r -g appuser appuser

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY . .

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 3000

ENV NODE_ENV=production

# Set healthcheck to verify container health
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]