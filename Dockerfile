# =============================================================================
# ТЕХНОПАРК ОАО «БЗАЛ» — Production Dockerfile (Node 22 Alpine)
# =============================================================================
FROM node:22-alpine

WORKDIR /app

# Copy package manifests first for layer caching
COPY package.json ./

# Install dependencies (including tsx & vite for build and runtime)
RUN npm install --legacy-peer-deps

# Copy project source code
COPY . .

# Build optimized frontend bundle into /app/dist
RUN npm run build

# Ensure persistent directories exist for local DB fallback & uploaded CMS images
RUN mkdir -p /app/data /app/public/images/uploads

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

CMD ["npm", "run", "start:prod"]
