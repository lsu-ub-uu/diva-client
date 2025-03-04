# Build stage
FROM node:20.18.3-slim AS builder

WORKDIR /usr/divaclient

COPY package.json package-lock.json ./
RUN npm ci

COPY app ./app
COPY server ./server
COPY vite.config.ts tsconfig.json react-router.config.ts server.ts ./

ARG BASE_PATH
ENV BASE_PATH=$BASE_PATH

RUN npm run build

# Production stage
FROM node:22.14.0-slim

WORKDIR /usr/divaclient

COPY --from=builder /usr/divaclient/package*.json ./
COPY --from=builder /usr/divaclient/dist ./dist
COPY --from=builder /usr/divaclient/server.ts ./
COPY --from=builder /usr/divaclient/server ./server

RUN npm ci --only=production

ENV NODE_ENV=production

RUN useradd -m divauser
USER divauser

CMD ["npm", "run", "start"]