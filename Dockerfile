FROM alpine:latest

ARG PB_VERSION=0.32.0

RUN apk add --no-cache \
    unzip \
    ca-certificates \
    nodejs \
    npm

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# copy package files and install dependencies
COPY ./package.json /pb/
WORKDIR /pb
RUN npm install --production

# copy migrations and hooks
COPY ./pb_migrations /pb/pb_migrations
COPY ./pb_hooks /pb/pb_hooks

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
