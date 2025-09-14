# 🚀 OrbitX6
> **SIH_OrbitX6** — an India-focused Off-Earth Operations dashboard built with Next.js + TypeScript. Features astronaut support (Gaganyaan-ready), spacecraft telemetry, debris monitoring, space-weather alerts, and Earth-observation services (disaster response, agriculture monitoring). Designed for SIH (Smart India Hackathon) submission and demos.

---

[![Repo Size](https://img.shields.io/github/repo-size/Arknight007/SIH_OrbitX6?style=for-the-badge)](https://github.com/Arknight007/SIH_OrbitX6)
[![Vercel](https://img.shields.io/badge/deploy%20vercel-ready-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)
[![Issues](https://img.shields.io/github/issues/Arknight007/SIH_OrbitX6?style=for-the-badge)](https://github.com/Arknight007/SIH_OrbitX6/issues)
[![Contributors](https://img.shields.io/github/contributors/Arknight007/SIH_OrbitX6?style=for-the-badge)](https://github.com/Arknight007/SIH_OrbitX6/graphs/contributors)
[![Last Commit](https://img.shields.io/github/last-commit/Arknight007/SIH_OrbitX6?style=for-the-badge)](https://github.com/Arknight007/SIH_OrbitX6/commits/main)



## 🔥 Quick Links
- Repo: https://github.com/Arknight007/SIH_OrbitX6  
- Demo (recommended deployment): Vercel / Netlify (configure via GitHub)

---

## ✨ Key Features
- Modular Next.js App Router structure (TypeScript)
- Collapsible sidebar + topbar quick actions for mission ops
- Astronaut support module: crew vitals, emergency protocols
- Spacecraft telemetry viewer + anomaly/predictive maintenance hooks
- Debris monitoring: TLE ingestion + conjunction alerts
- Space-weather service: solar activity & radiation notifications
- Earth observation: change detection & disaster-response pipeline
- Supabase scaffolded for Auth + lightweight DB (optional)

---

## 🧭 Architecture Overview

| Layer | Responsibility | Example folders / files |
|---|---:|---|
| Presentation (UI) | Visual components, layout, routing | `app/layout.tsx`, `app/home-page.tsx`, `components/ui/*`, `styles/globals.css` |
| Pages / Routes | App Router feature pages | `app/dashboard`, `app/astronaut-health`, `app/debris-monitoring`, `app/space-weather`, `app/disaster-response`, `app/spacecraft-telemetry` |
| Domain Components | Reusable UI primitives & widgets | `components/ui/collapsible-sidebar.tsx`, `flip-card.tsx`, `page-transition.tsx` |
| Hooks & State | Custom hooks, data fetching helpers | `hooks/*` |
| Services / Lib | External integrations (Supabase, telemetry parsers) | `lib/supabase.ts`, `lib/utils.ts` |
| Backend Jobs / Microservices* | Telemetry ingestion, SGP4 propagation, ML inference | recommended as separate Dockerized services |
| Public / Assets | Static images & icons | `public/images/*` |
| Config & Middleware | App configuration & auth guards | `next.config.mjs`, `middleware.ts` |
| CI / CD | Automated checks & deployments | `.github/workflows/ci.yml` (recommended) |

\* Microservices (Python/Go/Node) are recommended for compute-heavy tasks: SGP4 propagation, ML models (anomaly detection, debris risk), EO pipelines (raster processing).

---

## 🗂 Current Folder Map (from repo snapshot)

| Folder / File | Purpose |
|---|---|
| `app/` | App Router pages & feature routes (`layout.tsx`, `page.tsx`) |
| `app/dashboard` | Mission overview & KPIs |
| `app/astronaut-health` | Crew vitals & emergency module |
| `app/debris-monitoring` | TLE ingestion & conjunction checks |
| `app/space-weather` | Solar event detection & alerts |
| `app/spacecraft-telemetry` | Telemetry viewer & anomaly detector |
| `app/disaster-response` | EO imagery + change detection UI |
| `app/about`, `app/contact`, `app/settings`, `app/team` | Metadata & admin pages |
| `components/ui` | Reusable UI components (sidebar, buttons, cards) |
| `hooks/` | Custom hooks for auth, telemetry & data fetching |
| `lib/` | Low-level connectors & utilities (e.g., `supabase.ts`) |
| `public/images` | Placeholder assets & logos |
| `styles/` | Global stylesheet(s) |
| `middleware.ts` | Route protection / logging |
| `next.config.mjs` | Next.js configuration |

---

## 🔌 Tech Stack & Integrations
- **Frontend:** Next.js (App Router), React, TypeScript  
- **Styling:** Global CSS / Tailwind CSS optional  
- **Auth / DB:** Supabase (Auth + Postgres) — `lib/supabase.ts` scaffold  
- **Realtime / Telemetry:** WebSockets / Server-Sent Events (SSE) / Supabase Realtime  
- **EO / Mapping:** Mapbox GL / Leaflet for frontend; Earth Engine / rasterio for backend processing  
- **Orbital Propagation:** `sgp4` (Python/JS) for TLE handling (run in separate service)  
- **ML / Analytics:** Python microservices (TensorFlow/PyTorch) for anomaly & debris risk models  
- **CI / CD:** GitHub Actions → Vercel (deploy)  
- **Monitoring:** Sentry / Logflare (optional)

---

## ⚙️ Local Setup (copy & paste)

> Requirements: Node 18+, pnpm/npm/yarn, (optional) Supabase CLI for local DB emulation


# clone
```bash
git clone https://github.com/Arknight007/SIH_OrbitX6.git
cd SIH_OrbitX6
```

# install
```bash
pnpm install    # or npm install / yarn
```

# create env
```bash
cp .env.example .env.local
# Edit .env.local with values:
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=
# MAPBOX_TOKEN=
# NEXT_PUBLIC_API_BASE_URL=
```

# run dev
```bash
pnpm dev
# open http://localhost:3000
```
