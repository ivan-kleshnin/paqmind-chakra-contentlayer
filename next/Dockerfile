FROM node:16.13.1

WORKDIR /usr/src/app/

COPY package.json yarn.lock ./
# COPY ./prisma/ ./prisma/

RUN yarn install

COPY ./ ./

####################################################################################################

# Production image

# FROM node:16.13-alpine
# WORKDIR /app
# ENV NODE_ENV production

# COPY package*.json ./
# RUN npm ci --only=production --quiet

# COPY --chown=node:node --from=builder /app/prisma /app/prisma
# COPY --chown=node:node --from=builder /app/src /app/src

# USER node

# EXPOSE 8080
# CMD ["node", "src/index.js"]


