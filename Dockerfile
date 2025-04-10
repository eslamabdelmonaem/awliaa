ARG NODE_VERSION
# Dependencies
FROM node:$NODE_VERSION-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
ENV NODE_ENV=production
RUN npm ci
RUN npm cache clean --force
# Rebuild the source code only when needed
FROM node:$NODE_VERSION-slim AS builder
ARG NEXT_PUBLIC_BACKEND_URL
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM node:$NODE_VERSION-slim AS runner
ARG TINI_VERSION
ADD https://github.com/krallin/tini/releases/download/v${TINI_VERSION}/tini /usr/local/bin/tini
RUN chmod +x /usr/local/bin/tini
ARG NEXT_PUBLIC_BACKEND_URL
WORKDIR /app

ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT ["/usr/local/bin/tini", "--"]
CMD ["node", "server.js"]
