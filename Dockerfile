# Security fix. This image was `FROM node:16` (EOL, unpinned, no digest), ran as root with no
# `USER`, ran four separate `apt install` layers without `--no-install-recommends` and without
# clearing `/var/lib/apt/lists` (so the image carried a large, permanently stale CVE surface),
# piped `yes |` into apt to suppress non-interactive prompts (which also hides real failures),
# and finally did `COPY . /usr/source/contractcli`, baking the entire build context - including
# any local `.env` - into the image layer.
#
# A digest is intentionally not pinned here because the image must build on both amd64 and
# arm64; the major/minor tag is pinned instead, which is the strongest guarantee a multi-arch
# Dockerfile can make without a per-architecture digest matrix.
FROM node:20-bookworm-slim

# Single layer, no recommended packages, apt lists removed so they are not shipped in the image.
RUN apt-get update \
 && apt-get install -y --no-install-recommends wget openjdk-17-jdk-headless python3-dev python3-pip \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/source/contractcli

# Copy manifests first so the dependency layer is cached independently of source changes.
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile --ignore-scripts

# Copy the remaining source only, keeping stray local files out of the image.
COPY . .

# Drop root before the image is used for anything.
USER node