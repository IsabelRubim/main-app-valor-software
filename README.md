# Zephyr Micro-frontend Host (Main App)

This project is built using the Zephyr microfrontend platform to streamline integration and deployment across services.

## Overview

This is the host application that composes multiple microfrontends—`cart` and `products`—using Module Federation with [rspack](https://rspack.dev/).

## Architecture

- **Module Federation**: Configured in `module-federation.config.ts` and `rspack.config.ts`.
- **Remotes**:
  - `cart` at `http://localhost:3002/remoteEntry.js`
  - `products` at `http://localhost:3001/remoteEntry.js`

## Prerequisites

- Node.js >= 20
- pnpm or npm
- `rspack` CLI installed (via devDependencies)

## Installation

```bash
cd main-app-valor-software
pnpm install
```

## Running Locally

1. Start micro-frontends in parallel:

   ```bash
   git clone https://github.com/IsabelRubim/microfrontend-products.git
   cd microfrontend-products && pnpm install && pnpm start

   git clone https://github.com/IsabelRubim/microfrontend-cart.git
   cd microfrontend-cart && pnpm install && pnpm start
   ```

2. In another terminal, start host:
   ```bash
   cd main-app-valor-software && pnpm start
   ```
3. Open `http://localhost:3000` (host port from `rspack.config.ts`).

## Building for Production

```bash
cd main-app-valor-software && pnpm build
```

## How It Connects to Microfrontends

- The host HTML (`index.html`) mounts React app (`App.tsx`).
- In `module-federation.config.ts`, remotes are defined:
  ```ts
  exposes: { './Cart': 'cart@http://localhost:3002/remoteEntry.js' },
           { './Products': 'products@http://localhost:3001/remoteEntry.js' }
  ```
- Components are loaded dynamically via React’s `lazy` + `Suspense`.
