FROM node:20 AS build-env

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app
COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM node:20-slim AS runtime-env

WORKDIR /app
COPY --from=build-env /app/package.json .
COPY --from=build-env /app/build .

EXPOSE 3000
LABEL org.opencontainers.image.source=https://github.com/bddvlpr/petcare

CMD ["node", "index.js"]
