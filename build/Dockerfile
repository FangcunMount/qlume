# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app

ARG BUILD_SHA=unknown
ARG BUILD_REF=unknown

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.29-alpine AS runtime
WORKDIR /usr/share/nginx/html

ARG BUILD_SHA=unknown
ARG BUILD_REF=unknown
LABEL org.opencontainers.image.revision="${BUILD_SHA}"
LABEL org.opencontainers.image.ref.name="${BUILD_REF}"

COPY build/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist ./

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
