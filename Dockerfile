FROM node:20-alpine AS frontend-builder

RUN npm install -g pnpm

WORKDIR /app

COPY client/package.json client/pnpm-lock.yaml ./

RUN pnpm install

COPY client .

ENV VITE_SERVER_URL=""
ENV VITE_API_URL "/api"

RUN pnpm run build



FROM node:20 AS backend-builder

RUN npm install -g pnpm

WORKDIR /app

COPY server/package.json server/pnpm-lock.yaml ./

RUN pnpm install

COPY server .

RUN pnpm run prisma:generate

RUN pnpm run build



FROM node:20

RUN npm install -g pnpm

WORKDIR /app

RUN mkdir static

COPY --from=backend-builder /app/package.json ./
COPY --from=backend-builder /app/pnpm-lock.yaml ./

RUN pnpm install --prod

COPY --from=backend-builder /app/dist ./dist

# prizma client
COPY --from=backend-builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=backend-builder /app/node_modules/.pnpm/@prisma+client* ./node_modules/.pnpm/

# backend has static files path hardcoded as ../../../client/dist
COPY --from=frontend-builder /app/dist /client/dist

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
