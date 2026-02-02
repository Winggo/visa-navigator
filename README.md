# Lighthouse Take-Home Assignment - O-1 Visa Case Builder

A step-by-step wizard for collecting O-1 visa case evidence, built with Next.js and Firebase.

See [ASSIGNMENT.md](./docs/ASSIGNMENT.md) for the problem statement and requirements.
See [DESIGN.md](./docs/DESIGN.md) for my thought process from ideation to implementation.


## Quick Start

### Prerequisites
- Node.js 18+
- A Firebase project with Firestore enabled

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Firebase:**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Firestore Database
   - Go to Project Settings > General > Your apps > Add web app
   - Copy the Firebase config values to `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open http://localhost:3000**

## Features

- **Step-by-step wizard** with progress bar (Typeform-style)
- **Demographics collection** - basic user information
- **Criteria selection** - user picks 3+ O-1 criteria
- **Evidence collection** - dynamic forms for each selected criteria
- **Review page** - summary of all data before submission
- **Save/resume** - generates shareable link to continue later
- **Firebase persistence** - all data stored in Firestore

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS
- **Backend:** Next.js API Routes (Vercel Functions)
- **Database:** Firebase Firestore
- **Language:** TypeScript

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── case/[caseId]/        # Wizard page
│   └── api/cases/            # API routes
├── components/
│   ├── ui/                   # Base components (Button, Input, etc.)
│   ├── wizard/               # Wizard container and navigation
│   ├── steps/                # Step components (Demographics, Criteria, Review)
│   └── fields/               # Form field components
├── hooks/
│   └── useWizard.ts          # Wizard state management
└── lib/
    ├── firebase/             # Firebase config and helpers
    └── schemas/              # TypeScript types and criteria definitions
```

## Workflow

1. **Landing Page** - Start new case or resume existing
2. **Demographics** - Collect basic information (name, passport, address)
3. **Criteria Selection** - Choose 3+ O-1 criteria to demonstrate
4. **Evidence Steps** - One step per selected criteria with specific fields
5. **Review** - Summary of all collected data with edit links
6. **Submit** - Final submission

## Save/Resume

- Click "Save Progress" at any step to save and get a shareable link
- The link includes a resume token: `/case/[caseId]?token=[resumeToken]`
- Opening the link restores the case at the last saved step

---

## Problem Analysis

See [ASSIGNMENT.md](./ASSIGNMENT.md) for the original problem statement.

### Assumptions About Users
- **Stressed** - The visa process is high-stakes and confusing
- **Uninformed** - They may not understand what evidence qualifies
- **Disorganized** - They don't have all documents ready at once

### Design Decisions

1. **One step at a time** - Reduces cognitive load for stressed users
2. **Expandable help text** - "What qualifies?" explanations for each criteria
3. **Progress persistence** - Never lose work, save anytime
4. **Simple language** - Explain requirements without legal jargon
5. **URL-based evidence** - Users link to documents (Google Drive, Dropbox) instead of uploading

### What I Would Do Differently With More Time

1. **LLM Integration** - Add OpenAI chat sidebar for Q&A about criteria
2. **Evidence validation** - Use LLM to analyze if evidence is strong enough
3. **File uploads** - Direct upload to Firebase Storage instead of URLs
4. **Email notifications** - Send resume link via email
5. **Case manager dashboard** - Review and provide feedback on submissions
6. **Dynamic ordering** - Reorder criteria based on user profile strength
