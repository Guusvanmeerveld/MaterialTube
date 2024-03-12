FROM node:lts-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock prisma ./
RUN yarn install --frozen-lockfile

FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ENV NEXT_TELEMETRY_DISABLED 1;
RUN yarn run prisma:generate
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

FROM node:lts-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/postcss.config.js ./
COPY --from=builder /app/tailwind.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

CMD ["yarn", "run", "start:migrate"]