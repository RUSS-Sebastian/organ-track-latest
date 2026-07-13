================================================================================
OrganTrack – Health Report Architecture
================================================================================

                           TABLE OF CONTENTS

1.  Introduction & Problem Statement
2.  High‑Level Architecture Diagram
3.  Backend Deep Dive
    3.1 Fast Endpoint: submitDaily
    3.2 AI Service: AiReportService
    3.3 Background Job: GenerateDailyHealthReportJob
    3.4 Queue Worker
    3.5 Status & Retry Endpoints
4.  Database Schema
5.  Frontend Deep Dive
    5.1 Submission & LocalStorage
    5.2 Global Bubble: ReportBubble
    5.3 Progress Ring: ProgressRing
    5.4 Polling & Status Synchronisation
6.  Complete Flow – Timeline
7.  Bubble State Machine
8.  Handling Edge Cases
    8.1 Logout & Login
    8.2 Duplicate Daily Submissions
    8.3 AI Failures & Retries
    8.4 Page Refresh or Tab Close
9.  Security Considerations
10. Deployment & Configuration
11. Summary

================================================================================

1. # INTRODUCTION & PROBLEM STATEMENT

User answers ~60 daily habit questions → Backend calls AI to generate
a health report for 15 organs (score, summary, recommendations).

OLD (Synchronous) Flow:
Single HTTP request → save answers → call AI (60–120s) → save results
→ return response. Total time: 2–3 min. Success rate ~50%.
No retries. User stares at spinner.

NEW (Asynchronous) Flow:
Request returns instantly → background job handles AI.
Frontend shows a floating progress bubble. 99%+ reliability.

================================================================================ 2. HIGH‑LEVEL ARCHITECTURE DIAGRAM
================================================================================

┌─────────────────┐ POST /submit-daily ┌──────────────────────┐
│ │ ────────────────────────>│ │
│ React App │ │ Laravel API │
│ (Frontend) │<── { health_report_id } │ (Backend) │
│ │ │ │
│ ┌───────────┐ │ │ ┌─────────────────┐ │
│ │ Report │ │ Polling every 3s │ │ Queue Dispatch │ │
│ │ Bubble │ │<────────────────────────│ │ (Job) │ │
│ │ (global) │ │ GET /report-status/{id}│ └────────┬────────┘ │
│ └───────────┘ │ │ │ │
└─────────────────┘ └───────────┼──────────┘
│
┌────────▼──────────┐
│ Queue Worker │
│ (database driver) │
└────────┬──────────┘
│
┌────────▼──────────┐
│ OpenRouter AI │
│ (tencent/hy3) │
└───────────────────┘

================================================================================ 3. BACKEND DEEP DIVE
================================================================================

3.1 Fast Endpoint: submitDaily
File: app/Http/Controllers/Api/AnswerController.php
Method: submitDaily()

    Process (all in < 1 second):
      - Validate answers
      - Save 60 UserAnswer rows
      - Build formatted Q&A string
      - Fetch previous organ scores
      - Create HealthReport (status = 'pending') with job_params JSON
      - Dispatch GenerateDailyHealthReportJob
      - Return { health_report_id, status: 'processing' }

    Duplicate prevention:
      Unique constraint on (user_id, report_date) → returns 409 Conflict
      if same day submission exists.

3.2 AI Service: AiReportService
File: app/Services/AiReportService.php
Method: generateDailyHealthReportAI(string $prompt): ?array

    Sends prompt to OpenRouter API, parses JSON, returns array or null.
    No set_time_limit – worker handles execution time.

3.3 Background Job: GenerateDailyHealthReportJob
File: app/Jobs/GenerateDailyHealthReportJob.php

    Properties:
      $tries = 3       (retry 3 times on failure)
      $backoff = 10    (wait 10s between retries)

    handle():
      1. Update health_reports.status → 'processing'
      2. Build prompt (using stored QA, previous scores, gender organ)
      3. Call AiReportService
      4. If null → throw exception (retry)
      5. On success:
         - Create 15 HealthReportOrgan rows (ai_response JSON)
         - Create 15 OrganScoreHistory rows (score)
         - Update status → 'completed'

    failed():
      Update health_reports.status → 'failed'

3.4 Queue Worker
Command: php artisan queue:work
Driver: database (table: jobs)
Runs continuously, no time limit.
Production: Managed by Supervisor.

3.5 Status & Retry Endpoints
GET /api/report-status/{id}
Returns { status: 'pending'|'processing'|'completed'|'failed',
organs? (if completed) }

    POST /api/retry-report/{id}
      Only if status == 'failed'.
      Reads job_params from report, resets status to 'pending',
      re-dispatches job.

================================================================================ 4. DATABASE SCHEMA
================================================================================

┌─────────────────────┐
│ health_reports │
├─────────────────────┤
│ id (PK) │
│ user_id (FK) │── Unique constraint (user_id, report_date)
│ report_date │
│ status │── 'pending' | 'processing' | 'completed' | 'failed'
│ job_params (JSON) │── stored QA, previous scores, etc.
│ created_at │
│ updated_at │
└─────────────────────┘
│
│ 1
│
│ \*
┌──────────────────────────┐
│ health_report_organs │
├──────────────────────────┤
│ id (PK) │
│ health_report_id (FK) │
│ organ_id (FK) │── 15 rows per report
│ ai_response (JSON) │── { name, score, summary, ... }
│ created_at │
│ updated_at │
└──────────────────────────┘

┌──────────────────────────┐
│ organ_score_histories │
├──────────────────────────┤
│ id (PK) │
│ user_id (FK) │
│ organ_id (FK) │── 15 rows per report
│ report_date │
│ score │
│ created_at │
│ updated_at │
└──────────────────────────┘

┌────────────┐ ┌───────────────┐
│ jobs │ │ failed_jobs │
└────────────┘ └───────────────┘
(Laravel queue tables)

================================================================================ 5. FRONTEND DEEP DIVE
================================================================================

5.1 Submission & LocalStorage
Component: Questions.jsx

    After successful POST /submit-daily:
      const { health_report_id } = response.data;
      localStorage.setItem('pendingReportId', health_report_id);
      window.dispatchEvent(new Event('pendingReportChanged'));

5.2 Global Bubble: ReportBubble
File: components/ReportBubble.jsx
Rendered in App.jsx (appears on all pages)

    State Machine:

      ┌───────────┐    'completed' detected    ┌──────────────┐
      │           │ ───────────────────────────>│              │
      │ pending / │                            │  completed   │
      │processing │                            │ (green ✓ )   │
      │ (ring)    │                            │              │
      │           │                            └──────┬───────┘
      └─────┬─────┘                                   │ tap
            │                                         ▼
            │ tap                             Navigate to report,
            ▼                                clear localStorage
    ┌─────────────────────┐
    │  Modal (progress    │
    │  ring + "Close")    │
    └─────────────────────┘

            (on failure)
            │
            ▼
    ┌─────────────────┐
    │    failed       │
    │ (red ↻ icon)    │
    └────────┬────────┘
             │ tap
             ▼
    ┌──────────────────────────────┐
    │  Modal: "Report generation   │
    │  failed"                     │
    │  [Try Again]   [Cancel]      │
    └──────────────────────────────┘

    Polling:
      startPolling(id) – every 3 seconds calls GET /api/report-status/{id}

    Simulated progress:
      simulateProgress() – increases from 0% to 90% at random intervals.
      When real status becomes 'completed', snaps to 100%.

5.3 Progress Ring: ProgressRing
File: components/ProgressRing.jsx
SVG circle with dasharray/dashoffset for animated green arc.

5.4 Polling & Status Synchronisation
Frontend does NOT know real AI progress.
It fakes progress for smooth UI, polls backend for real status.
On completion, it jumps to 100% and shows checkmark.

================================================================================ 6. COMPLETE FLOW – TIMELINE
================================================================================

Time User / Frontend Backend / AI
──────────────────────────────────────────────────────────────────
0s Submit 60 answers
POST /submit-daily ────────────────> Controller saves answers,
creates pending report,
dispatches job.
0.5s Receive { health_report_id } Returns instantly.
Store ID in localStorage.
Fire 'pendingReportChanged' event.
Bubble appears (0%).
Start polling every 3s.
Start simulated progress.

1s Progress: 2% Queue Worker picks up job,
updates status → 'processing',
calls AI.

10s Progress: 15% AI is processing...

30s Progress: 40%

60s Progress: 70% AI still thinking...

90s Progress: 90% (holds) AI response received.
Parse & validate.
Save organs, scores.
status → 'completed'.

93s Polling detects 'completed' (Backend already done)
Progress snaps to 100%.
Bubble becomes green ✓.

       User taps bubble → navigate to
       report page, bubble dismissed.

================================================================================ 7. BUBBLE STATE MACHINE
================================================================================

                    ┌──────────────────────────┐
                    │  No pending report       │
                    │  (bubble not visible)    │
                    └─────────┬────────────────┘
                              │ submit / login with valid ID
                              ▼
                    ┌──────────────────────────┐
                    │   Generating             │
                    │   White circle + green   │
                    │   arc (0–99%)            │
                    └──┬─────────┬─────────────┘
               polling│         │ tap
                      │         ▼
                      │   ┌────────────────────────┐
                      │   │   Modal                 │
                      │   │   (larger ring + close) │
                      │   └────────────────────────┘
                      │
         ┌────────────┴──────────────┐
         │ completed                 │ failed
         ▼                           ▼

┌──────────────┐ ┌──────────────┐
│ Green circle │ │ Red circle │
│ + white ✓ │ │ + white ↻ │
└──────┬───────┘ └──────┬───────┘
│ tap │ tap
▼ ▼
Navigate to report ┌─────────────────────────────┐
(dismiss bubble) │ Modal: [Try Again] [Cancel] │
└─────────────────────────────┘

================================================================================ 8. HANDLING EDGE CASES
================================================================================

8.1 Logout & Login

    Logout:
      - Clears token + pendingReportId → bubble disappears.
      - Backend job continues unaffected.

    Login (same user while report still generating):
      - validatePendingReport() checks if stored ID belongs to user
        (by calling /api/report-status/{id} with new token).
      - If valid: keep ID → bubble reappears and resumes.
      - If invalid: remove stale ID.

8.2 Duplicate Daily Submissions
Unique constraint (user_id, report_date) prevents duplicates.
Controller returns 409 Conflict with existing report status.
If previous report failed, user can use retry endpoint.

8.3 AI Failures & Retries
Job retries 3 times automatically (10s delay between).
After all retries → status = 'failed'.
Frontend: bubble becomes red. Tap → modal → Try Again button.
Try Again calls POST /api/retry-report/{id}.

8.4 Page Refresh or Tab Close
pendingReportId persists in localStorage.
On page reload, ReportBubble reads ID, restarts polling + simulation
(progress restarts from 0%, but that's acceptable; it will quickly
climb to 90% and then snap to 100% if report already completed).

================================================================================ 9. SECURITY CONSIDERATIONS
================================================================================

- All API routes use Laravel Sanctum (Bearer token).
- Status/retry endpoints check Auth::id() against report owner.
- On logout, token and pending ID are cleared.
- Login validation prevents cross-user bubble access.
- job_params stored in database is not exposed to frontend.

================================================================================ 10. DEPLOYMENT & CONFIGURATION
================================================================================

Development (XAMPP / local):
.env settings:
QUEUE_CONNECTION=database
CACHE_DRIVER=database (or file)
Queue worker: php artisan queue:work
Vite proxy: /api → http://localhost:8000

Production:
.env settings:
QUEUE_CONNECTION=redis
CACHE_DRIVER=redis
Queue worker (managed by Supervisor):
php artisan queue:work redis --timeout=300
Ensure OPENROUTER_API_KEY is set.
Run migrations for new columns (status, job_params).

================================================================================ 11. SUMMARY
================================================================================

The architecture separates slow AI generation from the HTTP request,
making the app fast and reliable. A floating progress bubble gives
real-time feedback without page refreshes. Failures are handled with
automatic and manual retries. LocalStorage and custom events keep state
across pages, delivering a seamless user experience.

================================================================================
END OF DOCUMENTATION
================================================================================
