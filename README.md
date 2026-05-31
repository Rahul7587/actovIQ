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

## Current scope

- AI survey draft workflow
- Survey preview and respondent-taking UI
- Analytics dashboard mockup
- Spring Boot API shell with in-memory survey data

Database persistence will be added in the next phase.
