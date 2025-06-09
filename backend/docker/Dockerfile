# Multi-stage build for better optimization
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev)
RUN npm install

# Copy source code
COPY . .

# Production stage
FROM node:22-alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production --no-audit --no-fund && \
    npm cache clean --force

# Copy application code from builder
COPY --from=builder /app/src ./src
COPY --from=builder /app/server.js ./
COPY --from=builder /app/healthcheck.js ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S beatplayr -u 1001 && \
    chown -R beatplayr:nodejs /app

# Switch to non-root user
USER beatplayr

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

# Start application
CMD ["npm", "start"]