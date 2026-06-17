# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This is a two-service blog application kept in a single repo (no workspace tooling — each service has its own `package.json` and `pnpm-lock.yaml`):

- `Back_Blog/` — Express REST API (Node 22, ESM, MongoDB via Mongoose).
- `Front_Blog/` — React 18 SPA built with Vite, styled with Tailwind.

The package manager is **pnpm** (pinned to `pnpm@10.29.2` via the `packageManager` field in each `package.json` — corepack will use that exact version). Do not reintroduce `package-lock.json`.

## Commands

Run service commands from inside the respective service directory. Run Docker commands from the repo root.

**Backend** (`Back_Blog/`):
- `pnpm dev` — run with nodemon (auto-reload).
- `pnpm start` — run once (`node app.js`).
- No tests configured (`pnpm test` just errors out).

**Frontend** (`Front_Blog/`):
- `pnpm dev` — Vite dev server (port 5173).
- `pnpm build` — production build to `dist/`.
- `pnpm preview` — serve the production build.
- `pnpm lint` — ESLint (`--max-warnings 0`; lint must be clean).

**Full stack via Docker** (repo root):
- `docker compose up -d` — start mongo + backend + frontend.
- `docker compose build frontend` — rebuild needed after changing `VITE_API_URL` (see gotcha below).
- `docker compose down` — stop (Mongo data persists in the `mongo_data` volume).

Host ports when running via compose: frontend `8080`, backend `3000`, mongo `27017`.

## Architecture

**Backend** follows a layered Express structure under `Back_Blog/src/`: `routes/` → `controllers/` → `models/` (Mongoose). The app is bootstrapped by a `Server` class in `configs/server.js` that wires middleware, the Mongo connection (`configs/mongo.js`), and mounts two routers:
- `/blog/v1/projects` (full CRUD)
- `/blog/v1/comments` (create + list by project)

Key conventions:
- Routes attach `express-validator` `check(...)` chains plus the shared `validateFields` middleware (`src/middlewares/validateField.js`) before the controller. Custom existence checks live in `src/helpers/` (`projectExistById`, `commentExistById`).
- **Soft deletes**: documents carry a `state: Boolean` field. Deleting flips `state` to `false`; all reads filter `{ state: true }`. Never hard-delete.
- Image upload middleware (`src/middlewares/uploadImage .js` — note the space in the filename) parses multipart with `multiparty` and writes to a local `uploads/` dir, but it is **not currently wired into any route**, and the `image` field on a project is just a stored string. There is no static route serving `uploads/`.

**Frontend** is a 3-route SPA (`src/App.jsx`): `/` (Home), `/add` (CreateProject), `/post/:projectId` (PostDetails). Data access is centralized in `src/services/api.js` (a single axios instance); data fetching is wrapped in hooks under `src/hooks/` (`useProject`, `useComments`). UI is plain components under `src/components/`. API helpers never throw — on failure they return `{ error: true, e }`, so callers must check `.error`.

## Environment & known gotchas

- **`VITE_API_URL` is currently dead config.** The root `.env`/`.env.example` and the frontend Docker build arg define `VITE_API_URL`, but the code in `src/services/api.js` **hardcodes** `baseURL: 'http://localhost:3000/blog/v1'`. To make the env var actually take effect, change that to `import.meta.env.VITE_API_URL`. Until then, changing `VITE_API_URL` has no effect.
- Vite bakes env vars at **build time**, not runtime — so any future `VITE_*` change requires `docker compose build frontend`, not just a restart.
- Backend env vars (`Back_Blog/.env`): `PORT` and `MONGODB_CNN`. The app reads these via `dotenv`, which does not override values already in the environment, so compose-injected vars win. Inside compose the Mongo host is the service name `mongo` (`mongodb://mongo:27017/blog`); locally it's `localhost`.
- MongoDB runs **without authentication** (matches the connection string in code).
- pnpm version matters: a newer pnpm (e.g. 11.x) enforces a `minimumReleaseAge` supply-chain policy that can reject a frozen lockfile containing freshly published transitive deps. The pinned `packageManager: pnpm@10.29.2` avoids this — keep it pinned in Docker builds.
