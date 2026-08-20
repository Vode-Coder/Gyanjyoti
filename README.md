# LearnQuest — Gamified Learning Platform for Rural Education

A frontend-only React prototype (no backend, no database, no real auth) built to
demonstrate the product idea and UI/UX for a gamified learning platform serving
four roles: **School, Student, Parent, Candidate**.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

## Try it out

- Any non-empty ID + password logs you in for any role.
- **School** → create/edit/delete tasks, tests and games; browse students; view analytics.
- **Student** → complete a task (interactive quiz), earn XP/badges, check the leaderboard.
- **Parent** → monitor a child's progress, subject breakdown and insights.
- **Candidate** → register, pick an age group, watch the mock "AI personalization",
  then complete an age-appropriate task.
- Data (tasks you create, completed tasks, XP, candidate profile, etc.) persists in
  `localStorage`, so a page refresh won't reset your progress. Use **Logout** in the
  sidebar to clear the session and return to role selection.

## Stack

React 18 · Vite · Tailwind CSS · React Router v6 · Recharts · lucide-react

## Structure

```
src/
  components/   reusable UI building blocks (Button, Card, Modal, TaskCard, ...)
  layouts/      one shell per role (sidebar + outlet)
  pages/        route-level screens, grouped by role
  context/      AppContext — session + mock data state, synced to localStorage
  lib/          mock data and storage helpers
```

This is a prototype: authentication, document verification and AI personalization
are all simulated on the frontend with mock data and timed transitions.
