# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing a full-stack user authentication application:
- **`user-auth-frontend/`** — Angular 21 frontend (active main app)
- **`user-service/`** — Python FastAPI backend
- **`temp-project/`** — Angular template/scratch project (not production)

## Commands

### Frontend (`user-auth-frontend/`)
```bash
npm start        # Dev server on localhost:4200
npm run build    # Production build
npm test         # Run Vitest unit tests
npm run watch    # Build in watch mode (development)
```

### Backend (`user-service/`)
```bash
source venv/bin/activate
uvicorn main:app --reload   # Dev server on localhost:8000
```

## Architecture

### Frontend Structure
Angular 21 standalone components (no NgModules). Key patterns:

- **Dual layout system**: `AuthLayout` wraps login/register; `MainLayout` wraps authenticated views
- **Route guards**: `authGuard` blocks unauthenticated access; `guestGuard` redirects logged-in users away from auth pages
- **`auth-interceptor.ts`**: Automatically attaches `Authorization: Bearer <token>` to all HTTP requests
- **`auth.ts`** (AuthService): Handles API communication and JWT token storage in `localStorage`
- Routes defined in `app.routes.ts`; Angular configured in `app.config.ts`

### Backend Structure
FastAPI with SQLAlchemy ORM on SQLite:

- **`main.py`**: Route definitions (`POST /register`, `POST /login`, `GET /users/me`)
- **`auth.py`**: JWT creation/validation and bcrypt password hashing
- **`models.py`**: SQLAlchemy `User` model
- **`database.py`**: SQLite session management (`users.db`)
- CORS restricted to `http://localhost:4200`
- JWT tokens expire after 30 minutes

### Auth Flow
1. Login/register → backend returns JWT
2. Token stored in `localStorage`
3. Interceptor adds token to all subsequent requests
4. `authGuard` / `guestGuard` protect routes based on token presence
