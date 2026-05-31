# ActovIQ

AI-powered survey taking platform built with React, TypeScript, Tailwind CSS, and Spring Boot.

## Project layout

- `frontend/` - Vite React app for survey builders, respondents, and analytics.
- `backend/` - Spring Boot API with in-memory data for now.

## Prerequisites

- Node.js with npm
- Java 21+
- Maven 3.9+

## Run locally

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
mvn spring-boot:run
```

The frontend dev server proxies `/api` to `http://localhost:8080`.

## Deploy frontend to Vercel

Vercel should deploy the `frontend/` app. The Spring Boot API should be deployed separately on a backend host, then connected to Vercel with an environment variable.

Recommended Vercel project settings:

- Root Directory: `frontend`
- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

Set this Vercel environment variable after the backend is live:

```bash
VITE_API_BASE_URL=https://your-backend-domain.example
```

For local development, copy `frontend/.env.example` to `frontend/.env.local` if you want the frontend to call the backend directly. Leaving it unset also works locally because Vite proxies `/api` to `http://localhost:8080`.

## Current scope

- AI survey draft workflow
- Survey preview and respondent-taking UI
- Analytics dashboard mockup
- Spring Boot API shell with in-memory survey data

Database persistence will be added in the next phase.
