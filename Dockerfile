# Use a multi-stage build to handle the compiling, installing, etc.

# STAGE 1: Install node_modules on a stretch container
FROM node:14 as base
ARG APP_DIR=/node
EXPOSE 3000
WORKDIR $APP_DIR
RUN chown node:node $APP_DIR
COPY --chown=node:node package*.json ./
USER node
RUN ["npm", "install", "--no-optional"]
COPY --chown=node:node . .

# STAGE 2: Extend the base image as a builder image
FROM base as builder
ARG APP_NAME
ARG BASE_URL
ARG NODE_ENV
RUN npm run build -- --mode=production && rm -rf node_modules && npm install --no-optional --production

# STAGE 3: Copy the 'build' directory from previous stage and run in alpine
# Since this does not extend the base image, we need to set workdir, user, etc. again.
FROM node:10-alpine
ARG APP_DIR=/node
EXPOSE 3000
WORKDIR ${APP_DIR}
COPY --from=builder --chown=node:node $APP_DIR/dist .
COPY --from=builder --chown=node:node $APP_DIR/node_modules ./node_modules
USER node
CMD ["node", "./server"]
