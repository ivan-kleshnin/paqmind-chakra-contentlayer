FROM node:16.13.1
# -alpine (or apk) is incompatible with Prisma: https://github.com/prisma/prisma/issues/13717#issuecomment-1151080267

WORKDIR /usr/src/app/

# RUN apk add --update openssl openssl-dev libc6-compat
# RUN sudo apt install openssl openssl-dev libc6

COPY package.json yarn.lock ./
# COPY ./content/ ./content/
COPY ./prisma/ ./prisma/

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


