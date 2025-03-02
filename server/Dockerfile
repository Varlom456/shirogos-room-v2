FROM node:20 AS builder

RUN apt-get install openssl

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run prisma:generate

RUN pnpm run build



FROM node:20

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN pnpm install --prod

EXPOSE 3000

CMD ["node", "dist/src/main"]
