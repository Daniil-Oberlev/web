FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN npm install -g serve

COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/public ./public

USER appuser

EXPOSE 5173
HEALTHCHECK --interval=30s --timeout=3s CMD pgrep node || exit 1
ENV NODE_ENV=production
CMD ["serve", "-s", "dist", "-l", "5173"]
