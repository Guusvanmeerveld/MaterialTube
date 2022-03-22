FROM node:alpine AS deps

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile


FROM node:alpine AS builder

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

ENV NEXT_TELEMETRY_DISABLED 1;

RUN yarn export


FROM nginx AS runner

COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80