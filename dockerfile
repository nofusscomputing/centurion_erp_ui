ARG CI_PROJECT_URL=''
ARG CI_COMMIT_SHA=''
ARG CI_COMMIT_TAG=''

ARG ALPINE_VERSION=3.20
ARG NGINX_VERSION=1.27.2
ARG NODE_VERSION=22.11.0


FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as build


COPY . /workdir


WORKDIR /workdir


RUN npm install; \
    npm remove babel-preset-react-app; \
    npm run build




FROM nginx:${NGINX_VERSION}-alpine${ALPINE_VERSION}-slim


LABEL \
  org.opencontainers.image.vendor="No Fuss Computing" \
  org.opencontainers.image.title="Centurion ERP UI" \
  org.opencontainers.image.description="A react UI for Centurion ERP" \
  org.opencontainers.image.vendor="No Fuss Computing" \
  io.artifacthub.package.license="MIT"


ARG CI_PROJECT_URL
ARG CI_COMMIT_SHA
ARG CI_COMMIT_TAG


ENV CI_PROJECT_URL=${CI_PROJECT_URL}
ENV CI_COMMIT_SHA=${CI_COMMIT_SHA}
ENV CI_COMMIT_TAG=${CI_COMMIT_TAG}

ENV API_URL=__API_URL__


COPY --from=build /workdir/build/ /usr/share/nginx/html/


COPY includes/ /

RUN apk update --no-cache; \
    apk upgrade --no-cache; \
    apk add --no-cache \
        supervisor; \
    rm -f /etc/supervisord.conf; \
    chmod +x /entrypoint.sh


WORKDIR /var/log


EXPOSE 80

VOLUME [ "/var/log" ]


HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD \
  supervisorctl status || exit 1


ENTRYPOINT [ "/entrypoint.sh" ]
