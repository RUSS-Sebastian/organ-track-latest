# OrganTRACK — System Design Documentation

OrganTRACK is a health-tracking web application that helps users monitor organ health through daily habit check-ins and symptom-based questionnaires. AI-generated reports provide per-organ scores, risk assessments, and personalized recommendations.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture](#2-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Project Structure](#4-project-structure)
5. [Core Features](#5-core-features)
6. [Authentication & Authorization](#6-authentication--authorization)
7. [API Design](#7-api-design)
8. [Database Design](#8-database-design)
9. [Data Flows](#9-data-flows)
10. [AI Integration](#10-ai-integration)
11. [Frontend Architecture](#11-frontend-architecture)
12. [Deployment & Infrastructure](#12-deployment--infrastructure)
13. [Known Gaps & Technical Debt](#13-known-gaps--technical-debt)

---

## 1. Overview

### Purpose

OrganTRACK enables users to:

- Complete **daily habit check-ins** that produce AI-scored health reports across 15 organs
- **Track symptoms** for a specific organ and receive a focused AI risk report
- View **per-organ dashboards** with historical scores, charts, and recommendations
- Manage a **profile** with bilingual support (English / Burmese)

### Users

Single user type — all authenticated users share the same API access. There is no role-based access control (RBAC).

### Organs Tracked

16 organs are seeded in the database; 15 are shown per user based on gender:

| Common (14) | Gender-Specific |
|-------------|-----------------|
| Heart, Brain, Lungs, Liver, Kidney, Stomach, Muscles, Intestine, Gall Bladder, Pancreas, Skin, Bladder, Blood Vessels, Bone | Prostate (male), Uterus (female) |

---

## 2. Architecture

OrganTRACK uses a **decoupled client–server architecture** with two independent applications in one Git repository.

```
┌─────────────────────────────────────────────────────────────────┐
│                        User (Browser)                           │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS / HTTP
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              organ-track-fe  (React SPA — Vite)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Pages   │  │ Context  │  │  Axios   │  │ localStorage │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST API (Bearer token)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              organ-track-be  (Laravel 12 API)                   │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐  ┌───────────┐ │
│  │  Routes  │→ │ Controllers  │→ │  Models  │→ │  Database │ │
│  └──────────┘  └──────────────┘  └──────────┘  └───────────┘ │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   OpenRouter API (AI)                           │
│         stepfun/step-3.5-flash:free  |  openrouter/owl-alpha   │
└─────────────────────────────────────────────────────────────────┘
```

### Communication

| Aspect | Detail |
|--------|--------|
| Protocol | REST over HTTP |
| API base URL | `http://127.0.0.1:8000/api` (dev) |
| Auth header | `Authorization: Bearer <sanctum_token>` |
| CORS | Allows `http://localhost:5173` with credentials |

---

## 3. Technology Stack

### Frontend (`organ-track-fe`)

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build tool | Vite 7 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 |
| HTTP client | Axios |
| Charts | Recharts |
| Animation | GSAP, Anime.js |
| Icons | Font Awesome, Lucide, React Icons |
| Date handling | react-datepicker, date-fns |

### Backend (`organ-track-be`)

| Layer | Technology |
|-------|------------|
| Framework | Laravel 12 |
| Language | PHP 8.2+ |
| Authentication | Laravel Sanctum 4 (API tokens) |
| HTTP client | Laravel HTTP (Guzzle) |
| Default database | SQLite |
| Queue / cache / session | Database drivers |
| File storage | Local `public` disk (profile images) |
| Testing | PHPUnit |

### External Services

| Service | Purpose |
|---------|---------|
| OpenRouter | AI report generation |
| AWS S3 | Configured but unused (images stored locally) |

---

## 4. Project Structure

```
OrganTRACK/
├── docs/
│   └── SYSTEM_DESIGN.md          # This document
├── organ-track-fe/               # React frontend
│   ├── src/
│   │   ├── api/                  # Axios instance
│   │   ├── components/           # Reusable UI components
│   │   ├── context/              # React context providers
│   │   ├── pages/                # Route-level page components
│   │   ├── utils/                # Helpers (e.g. draft storage)
│   │   ├── data/                 # Static organ data
│   │   ├── App.jsx               # Route definitions
│   │   └── Layout.jsx            # Shell with bottom nav
│   ├── package.json
│   └── vite.config.js
├── organ-track-be/               # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/     # API controllers
│   │   └── Models/               # Eloquent models
│   ├── database/
│   │   ├── migrations/           # Schema migrations
│   │   └── seeders/              # Organ seeder
│   ├── routes/api.php            # API route definitions
│   ├── config/                   # App, CORS, Sanctum, services
│   └── composer.json
└── .gitignore
```

---

## 5. Core Features

### 5.1 Authentication & Profile

| Feature | Frontend | Backend |
|---------|----------|---------|
| Register | `Register.jsx` | `AuthController@register` |
| Login | `Login.jsx` | `AuthController@login` |
| Logout | Settings | `AuthController@logout` |
| View / edit profile | `EditProfile.jsx` | `AuthController@profile`, `updateProfile` |
| Upload avatar | `EditProfile.jsx` | `AuthController@updateImage` |
| Language preference | `Settings1.jsx` | `MeController@updateLanguage` |

### 5.2 Home Dashboard

The home screen displays a grid of organs with health status badges (Good / Moderate / Needs Attention), driven by the latest daily AI report.

- **Route:** `/`
- **Frontend:** `Home.jsx`
- **API:** `GET /latest-organ-status`

Tapping an organ navigates to `/each-organ/:organId`.

### 5.3 Daily Habit Check-In

Users answer daily lifestyle questions once per day. Answers are sent to AI, which generates scores for all 15 organs.

| Step | Detail |
|------|--------|
| Entry | `/checkin` → `Countdown.jsx` |
| Gate | `GET /daily-check?today=YYYY-MM-DD` |
| Questions | `/questions/daily` → `Questions.jsx` |
| Submit | `POST /submit-daily` |
| Result | Redirect to Home with updated organ statuses |

A countdown timer resets at midnight if the user has already completed today's check-in.

### 5.4 Symptom Tracking

Users select an organ, answer symptom questions, and receive a per-organ AI risk report.

| Step | Detail |
|------|--------|
| Entry | `/track` → `TrackSyms.jsx` |
| Organ selection | `OrganSelectOverlay.jsx` |
| Questions | `/questions/:organId` |
| Submit | `POST /submit-and-generate-report` |
| Result | `/trackResult/:reportId` → `Track.jsx` |
| History | Rename / delete via `GET/PUT/DELETE /tracks` |

### 5.5 Per-Organ Detail

Deep-dive view for a single organ with score ring, summary, habits, conditions, recommendations, and historical charts.

- **Route:** `/each-organ/:organId`
- **Frontend:** `EachOrgan.jsx`
- **APIs:**
  - `GET /organ-report-specific/:organId?date=`
  - `GET /organ-chart/:organId?range=week|month|year`

### 5.6 Report Store (Partial)

Date-range health analysis reports. The backend generates AI output, but persistence and the results UI are incomplete.

- **Routes:** `/report`, `/ReportInput`, `/report-details`
- **API:** `POST /health-report/generate`
- **Status:** `TrackReport.jsx` and `ReportDetails.jsx` use mock data

### 5.7 Navigation

Authenticated pages use a shared layout with a bottom navigation bar:

| Tab | Route | Page |
|-----|-------|------|
| Home | `/` | `Home.jsx` |
| Check-in | `/checkin` | `Countdown.jsx` |
| Track Symptoms | `/track` | `TrackSyms.jsx` |
| Settings | `/settings` | `Settings1.jsx` |

---

## 6. Authentication & Authorization

### Flow

```
┌────────┐    POST /register     ┌─────────┐
│ Client │ ──────────────────► │ Laravel │  → Create user (bcrypt password)
└────────┘                       └─────────┘  → 201 (no token)

┌────────┐    POST /login        ┌─────────┐
│ Client │ ──────────────────► │ Laravel │  → Verify credentials
└────────┘                       └─────────┘  → Create Sanctum token (7 days)
       ◄──────────────────────               → { user, token }
       │  Store token in localStorage

┌────────┐  GET /me (Bearer token)  ┌─────────┐
│ Client │ ──────────────────────► │ Laravel │  → Sanctum validates token
└────────┘                          └─────────┘  → User profile

┌────────┐    POST /logout         ┌─────────┐
│ Client │ ──────────────────► │ Laravel │  → Delete current token
└────────┘                       └─────────┘
```

### Client-Side Guard

`PrivateRoute.jsx` checks for `localStorage.token`. If absent, the user is redirected to `/login`.

### Server-Side Guard

Protected routes are wrapped in `auth:sanctum` middleware in `routes/api.php`.

### Token Storage

| Location | Key | Lifetime |
|----------|-----|----------|
| Browser `localStorage` | `token` | 7 days (server-enforced) |
| Database | `personal_access_tokens` | Managed by Sanctum |

---

## 7. API Design

Base path: `/api`

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Create a new user account |
| `POST` | `/login` | Authenticate and receive a token |
| `GET` | `/test` | Health check |

### Protected Endpoints (`auth:sanctum`)

#### User & Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/me` | Current user profile |
| `PUT` | `/user/language` | Update language preference |
| `GET` | `/me/organs` | Legacy organ status from `tracks` table |
| `GET` | `/profile` | Read profile |
| `PUT` | `/profile` | Update profile |
| `POST` | `/profile/image` | Upload profile image |
| `POST` | `/logout` | Revoke current token |

#### Organs & Questions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/organs?gender=` | List organs (common + gender-specific) |
| `GET` | `/organs/{id}` | Symptom questions for an organ |
| `GET` | `/daily-questions` | Daily habit questions |

#### Daily Check-In

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/daily-check?today=` | Whether user completed daily questions today |
| `POST` | `/submit-daily` | Submit answers and generate daily organ report |

#### Symptom Tracking

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/submit-and-generate-report` | Submit symptom answers and generate AI report |
| `GET` | `/ai-report/{report}` | Fetch a symptom track report |
| `GET` | `/tracks` | Paginated symptom track history |
| `PUT` | `/tracks/{id}` | Rename a track |
| `DELETE` | `/tracks/{id}` | Delete a track |

#### Organ Reports & Charts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/latest-organ-status` | Home dashboard organ statuses |
| `GET` | `/organ-report/{organId}` | Latest daily report for one organ |
| `GET` | `/organ-report-specific/{organId}?date=` | Report for organ on a specific date |
| `GET` | `/organ-chart/{organId}?range=` | Score time series (week / month / year) |

#### Health Analysis

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/health-report/generate` | Date-range aggregated AI analysis |

---

## 8. Database Design

### Entity Relationship Diagram

```
┌──────────┐       ┌──────────────┐       ┌─────────────────┐
│   User   │───<───│  UserAnswer  │──────>│ QuestionOption  │
└──────────┘       └──────────────┘       └─────────────────┘
     │                    │                        │
     │                    │                        │
     │                    ▼                        ▼
     │             ┌──────────────┐          ┌──────────┐
     │             │   AiReport   │          │ Question │
     │             └──────────────┘          └──────────┘
     │                                                │
     │             ┌──────────────┐                   │
     ├────────────>│ HealthReport │                   │
     │             └──────────────┘                   │
     │                    │                          │
     │                    ▼                          ▼
     │         ┌──────────────────┐           ┌──────────┐
     │         │ HealthReportOrgan│──────────>│  Organ   │
     │         └──────────────────┘           └──────────┘
     │
     │             ┌──────────────────┐
     └────────────>│OrganScoreHistory │
                   └──────────────────┘
```

### Tables with Migrations

| Table | Key Columns | Purpose |
|-------|-------------|---------|
| `users` | name, email, gender, password, image | User accounts |
| `personal_access_tokens` | tokenable_id, token, abilities | Sanctum API tokens |
| `organs` | name, gender (common/male/female) | Organ definitions |
| `questions` | category_type, organ_id, question_text_en/mm, question_type | Daily and symptom questions |
| `question_options` | question_id, option_text_en/mm, score | Answer choices |
| `user_answers` | user_id, question_id, option_id, answered_date | Stored user responses |
| `ai_reports` | user_id, answered_date, ai_response (JSON) | Symptom track AI reports |
| `tracks` | user_id, name, organ, date | Legacy track records |

### Tables Referenced in Code (No Migration in Repo)

These tables/columns are used by application code but lack checked-in migrations. A fresh `php artisan migrate` may not support full app behavior.

| Table / Column | Used By |
|----------------|---------|
| `health_reports` | `HealthReport` model, daily check-in flow |
| `health_report_organs` | `HealthReportOrgan` model |
| `organ_score_histories` | `OrganScoreHistory`, charts, home dashboard |
| `health_range_reports` | `HealthRangeReport` model |
| `user_answers.ai_report_id` | Links answers to symptom reports |
| `ai_reports.report_name`, `organ_name` | Track history display |
| `users.language_preference` | Bilingual UI |

### Scoring Rules (Daily AI)

- Default score: **75** when no history exists
- Score range: **0–100**
- Daily change cap: **±2** per organ per day
- 15 organs scored per daily report (14 common + 1 gender-specific)

---

## 9. Data Flows

### Flow 1: Daily Habit Check-In

```
User opens /checkin
    │
    ▼
GET /daily-check?today=YYYY-MM-DD
    │
    ├── Already answered → Show countdown until midnight
    │
    └── Not answered → Navigate to /questions/daily
                          │
                          ▼
                    GET /daily-questions
                          │
                          ▼
                    User answers questions
                    (auto-saved to localStorage draft)
                          │
                          ▼
                    POST /submit-daily { answers, timezone }
                          │
                          ├── Save UserAnswer rows
                          ├── Fetch previous scores
                          ├── Call OpenRouter AI
                          ├── Create HealthReport
                          ├── Create HealthReportOrgan (×15)
                          └── Create OrganScoreHistory entries
                          │
                          ▼
                    Redirect to Home
                          │
                          ▼
                    GET /latest-organ-status → Render organ grid
```

### Flow 2: Symptom Track

```
User opens /track
    │
    ▼
Select organ (OrganSelectOverlay)
    │
    ▼
Navigate to /questions/:organId
    │
    ▼
GET /organs/:id (symptom questions)
    │
    ▼
User answers questions
    │
    ▼
POST /submit-and-generate-report
    │
    ├── Group answers by organ
    ├── Call OpenRouter AI (per organ)
    ├── Create AiReport record
    └── Link UserAnswers via ai_report_id
    │
    ▼
/thanks/syms/:reportId → /trackResult/:reportId
    │
    ▼
GET /ai-report/:reportId → Display risk report
```

### Flow 3: Per-Organ Deep Dive

```
Home → Tap organ
    │
    ▼
/each-organ/:organId
    │
    ├── GET /organ-report-specific/:id?date=YYYY-MM-DD
    │       → Score ring, summary, habits, recommendations
    │
    └── GET /organ-chart/:id?range=week|month|year
            → Recharts line chart of historical scores
```

### Flow 4: Client-Side Draft Persistence

Question progress is auto-saved to `localStorage` so users can resume later:

| Key Pattern | Used For |
|-------------|----------|
| `draft_daily_user_{userId}` | Daily check-in draft |
| `draft_organ_{organId}_user_{userId}` | Symptom question draft |

Managed by `src/utils/draftStorage.js`.

---

## 10. AI Integration

All production AI calls are made **server-side** through the OpenRouter API.

| Use Case | Model | Controller Method |
|----------|-------|-------------------|
| Daily organ health report | `stepfun/step-3.5-flash:free` | `AnswerController::generateDailyHealthReportAI` |
| Symptom track report | `openrouter/owl-alpha` | `AnswerController::callOpenRouter` |
| Date-range health analysis | `stepfun/step-3.5-flash:free` | `HealthAnalysisController::generateHealthReportAI` |

### Configuration

| Setting | Location |
|---------|----------|
| API URL | `https://openrouter.ai/api/v1/chat/completions` |
| API key | `OPENROUTER_API_KEY` env variable |
| Config reference | `config/services.php` → `openrouter.api_key` |
| Request timeout | Up to 240 seconds (`set_time_limit(240)`) |

### AI Output Structure (Daily Report)

The daily AI prompt instructs the model to return JSON with per-organ data including:

- `score` (0–100)
- `status` (Good / Moderate / Needs Attention)
- `summary`, `habits`, `conditions`, `recommendations`

This is persisted in `health_report_organs` and `organ_score_histories`.

---

## 11. Frontend Architecture

### Routing

Defined in `src/App.jsx`:

| Type | Routes |
|------|--------|
| Public | `/login`, `/register`, `/Terms`, `/Landing`, `/ai` |
| Protected (with Layout + bottom nav) | `/`, `/checkin`, `/track`, `/settings`, `/each-organ/:organId`, `/questions/:organId`, `/trackResult/:reportId`, `/report`, etc. |

### State Management

| Mechanism | Usage |
|-----------|-------|
| React Context | `LanguageContext` for bilingual UI (EN / MM) |
| `localStorage` | Auth token, question drafts |
| Component state | Page-level data fetching and UI state |

### API Client

```js
// src/api/axios.js
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});
```

Authenticated requests attach the Bearer token from `localStorage` at the call site.

### Bilingual Support

Questions and options store both `question_text_en` / `question_text_mm` and `option_text_en` / `option_text_mm`. The UI language is controlled by `LanguageContext` and the user's `language_preference`.

---

## 12. Deployment & Infrastructure

### Local Development

**Backend:**

```bash
cd organ-track-be
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
# Set OPENROUTER_API_KEY in .env
php artisan serve          # http://127.0.0.1:8000
```

Or use the combined dev script:

```bash
composer dev   # Runs server + queue + logs + Vite concurrently
```

**Frontend:**

```bash
cd organ-track-fe
npm install
npm run dev      # http://localhost:5173
```

### Environment Variables

| Variable | App | Purpose |
|----------|-----|---------|
| `APP_KEY` | BE | Laravel encryption key |
| `DB_CONNECTION` | BE | Database driver (default: `sqlite`) |
| `OPENROUTER_API_KEY` | BE | OpenRouter AI API key |
| `QUEUE_CONNECTION` | BE | Queue driver (default: `database`) |

### Production Considerations

| Area | Current State |
|------|---------------|
| Docker | Not configured |
| CI/CD | Not configured |
| HTTPS | Not configured (dev URLs hardcoded) |
| File storage | Local disk (S3 configured but unused) |
| Email | `MAIL_MAILER=log` (no email flows) |
| Health check | Laravel `/up` endpoint available |

### Recommended Production Setup

1. Deploy Laravel API behind a reverse proxy (Nginx / Apache) with HTTPS
2. Build React SPA (`npm run build`) and serve as static files or via CDN
3. Switch database to MySQL or PostgreSQL
4. Set `OPENROUTER_API_KEY` as a secure environment variable
5. Update CORS origins and Axios `baseURL` to production domains
6. Add missing database migrations for tables referenced in code

---

## 13. Known Gaps & Technical Debt

| Issue | Impact | Location |
|-------|--------|----------|
| **Schema drift** | Fresh migrations won't create all tables/columns the app expects | Models vs `database/migrations/` |
| **Dual tracking systems** | Legacy `tracks` table coexists with `ai_reports` + `organ_score_histories` | `MeController` vs `TrackController` |
| **Report Store incomplete** | AI generates output but results UI uses mock data | `HealthAnalysisController`, `TrackReport.jsx` |
| **Hardcoded API URLs** | Some components bypass the shared Axios instance | `TrackHistory.jsx` |
| **Hardcoded API key** | OpenRouter key exposed in browser (dev test page) | `AiTest.jsx` |
| **No RBAC** | All users have identical API access | `routes/api.php` |
| **No production deploy config** | Manual deployment required | No Docker, CI/CD, or README |

---

## Appendix: Key File Reference

| Area | Path |
|------|------|
| API routes | `organ-track-be/routes/api.php` |
| Auth controller | `organ-track-be/app/Http/Controllers/Api/AuthController.php` |
| Answer / AI controller | `organ-track-be/app/Http/Controllers/Api/AnswerController.php` |
| Organ score controller | `organ-track-be/app/Http/Controllers/OrganScoreController.php` |
| Frontend routes | `organ-track-fe/src/App.jsx` |
| API client | `organ-track-fe/src/api/axios.js` |
| Auth guard | `organ-track-fe/src/components/PrivateRoute.jsx` |
| Organ seeder | `organ-track-be/database/seeders/OrganSeeder.php` |
| CORS config | `organ-track-be/config/cors.php` |
| OpenRouter config | `organ-track-be/config/services.php` |

---

*Last updated: July 2026*
