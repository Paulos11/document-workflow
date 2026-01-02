# Document Review & Approval Workflow

A React-based document management system for handling employee document submissions and approvals.

## Wireframes

View the Figma wireframes here: [Document Workflow Mid-fi Wireframes](https://www.figma.com/design/2CZg7NQz6xyZLtb3a06tVR/Document-Workflow-Mid-fi-Wireframes?node-id=2-2&t=YNezRXYwCMAlFdiM-1)

Screenshots of the implemented UI are available in the `/screenshots` folder.

## Quick Start

You'll need Node.js 18 or higher installed.

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

For production build:
```bash
npm run build
```

## What This Does

This module handles the full lifecycle of employee document submissions - from upload through review and approval. It replaces the old process of emailing documents back and forth or using shared folders.

Main features:
- File upload with drag-and-drop (PDF, DOCX, JPG, PNG up to 10MB)
- Multi-step upload wizard with category selection
- Dynamic metadata forms based on document type
- Document review interface with commenting
- 6-stage workflow: Draft → Submitted → In Review → Changes Requested → Resubmitted → Approved
- Activity timeline showing full audit trail
- Status notifications and banners
- Role-based views for employees and reviewers

## Important Assumptions

This is a frontend prototype with some limitations:

**No Backend**
- Everything runs in the browser using React Context for state
- localStorage is used for persistence (survives page refresh)
- File uploads are stored in browser memory, not sent anywhere
- No real API calls

**Authentication**
- No login system - app assumes you're already authenticated
- Simple role switching between Employee and Reviewer for demo purposes
- No actual permission enforcement

**Data**
- Comes with mock documents to demonstrate the workflow
- You can upload new documents but they only exist in your browser
- Use the "Reset Data" button in the header to clear everything

**Files**
- Max 5 files per submission, 10MB each
- PDF preview implemented (displays sample PDF in modal using native browser PDF viewer)
- File downloads are simulated (no actual file storage)

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Base components (Button, Input, Card, etc.)
│   ├── layout/                # Header, Footer
│   ├── feedback/              # Toast notifications, StatusBanner
│   ├── documents/             # Document cards, tables, upload components
│   │   └── upload/            # Upload wizard, file upload, metadata form
│   ├── review/                # Review page components
│   └── timeline/              # Activity timeline
├── pages/                     # DashboardPage, UploadPage, ReviewPage
├── context/                   # AppContext for global state
├── constants/                 # Document categories, statuses, file types
├── data/                      # Mock documents and users
├── utils/                     # Formatters, validators, storage helpers
├── types/                     # TypeScript type definitions
└── lib/                       # Utility libraries
```

## How It Works

**State Management**

Using React Context for global state. The `AppContext` provides:
- `documents` - all documents in the system
- `currentUser` - logged in user info
- `currentRole` - Employee or Reviewer
- `notification` - toast messages
- `statusBanner` - contextual banners for workflow changes

All state changes automatically sync to localStorage.

**Workflow**

Documents move through 6 statuses:

1. **Draft** - Saved but not submitted yet
2. **Submitted** - Waiting for reviewer
3. **In Review** - Reviewer is looking at it
4. **Changes Requested** - Reviewer wants updates
5. **Resubmitted** - Employee uploaded new version
6. **Approved** - Done

Valid transitions are enforced. For example, you can't go from Draft directly to Approved.

**User Roles**

Employees can:
- Upload documents
- Fill out metadata forms
- View status
- Resubmit when changes are requested

Reviewers can:
- View submitted documents
- Add comments
- Request changes with feedback
- Approve documents

## Document Categories

**Identification**
- Passport, Driver's License, National ID, Residence Permit
- Required fields: Title, Document Number, Expiration Date, Issuing Authority

**Employment**
- Employment Contract, Contract Amendment, NDA, Work Permit
- Required fields: Title, Contract Start/End Dates

**Education**
- Degree, Diploma, Professional Certificate, Training Certificate
- Required fields: Title, Institution, Date Obtained

**Supporting**
- Utility Bill, Bank Statement, Reference Letter
- Required fields: Title, Issue Date

Each category has specific required fields that show up in the metadata form.

## Tech Stack

- React 19 with functional components and hooks
- TypeScript for type-safe upload components
- Vite for dev server and building
- Tailwind CSS 4 for styling
- Lucide React for icons
- React Router for navigation
- Context API for state management

The design uses a professional blue color scheme (#0E64BC primary blue) with a clean interface.

## Known Limitations

- No backend means data only lives in your browser
- No real-time updates between users
- No actual file storage or processing
- Search and filtering not implemented
- No pagination (loads all documents at once)
- Email notifications are just in-app banners

## What Would Be Needed for Production

To make this production-ready, you'd need:

- REST or GraphQL API for data operations
- File upload to cloud storage (S3, Azure Blob, etc.)
- Real authentication and authorization
- Database for documents and user data
- Email notifications for status changes
- WebSockets or polling for real-time updates
- Search, filtering, and pagination
- Proper error handling and logging
- Document versioning
- Audit log exports
- Tests (unit, integration, E2E)

## localStorage Persistence

The app automatically saves all changes to browser localStorage:

**What Gets Saved:**
- All documents (new uploads, status changes, comments)
- Current user and role
- Persists across page refreshes

**How to Reset:**
- Use the "Reset Data" button in the header dropdown to clear everything and reload the mock data
- Or manually clear browser localStorage for localhost:5173

**Storage Limits:**
- Chrome/Edge: ~10MB
- Firefox: ~10MB
- Safari: ~5MB

The app checks if localStorage is available and falls back gracefully if disabled (e.g., in private browsing mode).

## Development Notes

The code follows these patterns:
- Functional components with hooks, no classes
- Props destructured in function signatures
- Minimal comments (code should be self-documenting)
- Composition over complex component hierarchies
- Controlled form components

File naming:
- Components: PascalCase (`DocumentCard.jsx`)
- Utilities: camelCase (`formatters.js`)
- Constants: UPPER_SNAKE_CASE in the code

## Browser Support

Works on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Designed mobile-first, so it works on phones and tablets.

---

This was built as a technical assessment demonstrating React development, UI/UX design, and workflow implementation.
