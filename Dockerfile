FROM alpine:latest

RUN apk add --no-cache \
    unzip \
    ca-certificates \
    nodejs \
    npm \
    curl \
    jq

# Get latest PocketBase version from GitHub API
RUN LATEST_VERSION=$(curl -s https://api.github.com/repos/pocketbase/pocketbase/releases/latest | jq -r '.tag_name' | sed 's/v//') && \
    echo "Downloading PocketBase version: ${LATEST_VERSION}" && \
    curl -L "https://github.com/pocketbase/pocketbase/releases/download/v${LATEST_VERSION}/pocketbase_${LATEST_VERSION}_linux_amd64.zip" -o /tmp/pb.zip && \
    unzip /tmp/pb.zip -d /pb/

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
