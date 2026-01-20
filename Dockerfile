FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# Set working directory (creates it automatically if missing)
WORKDIR /app

# Copy dependency manifests first to leverage Docker cache
COPY package.json package-lock.json* ./

# Install Node.js dependencies
RUN npm ci --force

# Install Playwright browsers (only if not already present / version-aligned)
RUN npx playwright install

# Copy the rest of the application source
COPY . .

# Default command (override at runtime if needed)
CMD ["npx", "playwright", "test"]
