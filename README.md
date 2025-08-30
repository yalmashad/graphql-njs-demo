# GraphQL NGINX + NJS Demo

This repository demonstrates a **GraphQL backend** with **NGINX + NJS** enforcing **query depth limits**.

## Features

- NGINX with **NJS module** for GraphQL depth checking.
- Node.js backend with **Apollo Server**.
- Dockerized setup for easy testing.
- Configurable maximum query depth (default 5).

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/yalmashad/graphql-njs-demo
cd graphql-njs-demo
```

2. Build and start containers:
```bash
docker-compose up --build
```

3. Test GraphQL depth:
```bash
# Valid depth
curl -X POST http://localhost/graphql \
     -H "Content-Type: application/json" \
     -d '{"query":"{ user { posts { comments { id } } } }"}' | jq

# Too deep
curl -X POST http://localhost/graphql \
     -H "Content-Type: application/json" \
     -d '{"query":"{ a { b { c { d { e { f } } } } } }"}'
```

Valid queries pass through to the backend.
Queries exceeding the maximum depth are blocked by NJS.

## Configuration
Maximum query depth is defined in `nginx/graphql_depth.js`:
```bash
const MAX_DEPTH = 5;
```
