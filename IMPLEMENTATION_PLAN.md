# Implementation Notes

Quick notes on how this project was put together and the decisions made along the way.

## Requirements

Build a document review and approval workflow module with:
- File upload (PDF, DOCX, JPG, PNG) with drag-and-drop
- Dynamic metadata forms based on document type
- 6-stage status workflow
- Review interface with comments
- Status notifications
- Activity timeline

Two user roles:
- Employee (submits and resubmits documents)
- Reviewer (reviews, comments, approves/rejects)

## Workflow Stages

```
Draft → Submitted → In Review → Changes Requested → Resubmitted → Approved
                                      ↓
                              (can loop back to Resubmitted)
```

## Project Structure

```
src/
├── components/
│   ├── ui/               Base UI components (Button, Input, Card, etc.)
│   ├── layout/           Header, Footer
│   ├── feedback/         Status banners, toasts, empty states
│   ├── documents/        Document cards, lists, status badges
│   ├── upload/           File upload flow with metadata form
│   ├── review/           Review interface with comments
│   └── timeline/         Activity timeline
├── pages/                Main views (Dashboard, Upload, Review)
├── context/              Global state management
├── constants/            Document categories, statuses
├── utils/                Helper functions
└── data/                 Mock data
```

## Document Categories

Each category has different required metadata fields:

**Identification Documents**
- Passport, Driver's License, National ID, Residence Permit
- Fields: documentTitle, documentNumber, expirationDate, issuingAuthority

**Employment Documents**
- Employment Contract, Contract Amendment, NDA, Work Permit
- Fields: documentTitle, contractStartDate, contractEndDate

**Educational & Certification**
- Degree, Diploma, Professional Certificate, Training Certificate
- Fields: documentTitle, certificationIssuer, completionDate

**Supporting Documents**
- Utility Bill, Bank Statement, Reference Letter
- Fields: documentTitle, description, issueDate

## Data Model

Documents have this structure:

```javascript
{
  id: "unique-id",
  name: "filename.pdf",
  category: "Employment Documents",
  status: "Submitted",
  uploadedBy: "John Doe",
  uploadedDate: "2025-01-15",
  reviewer: "Sarah Johnson",
  metadata: {
    documentTitle: "Employment Contract",
    contractStartDate: "2025-02-01",
    contractEndDate: "2026-02-01"
  },
  files: [File],
  comments: [
    {
      id: 1,
      author: "Sarah Johnson",
      text: "Please clarify section 3",
      timestamp: "2025-01-16T10:30:00Z"
    }
  ],
  activities: [
    {
      id: 1,
      type: "upload",
      action: "Document uploaded",
      user: "John Doe",
      timestamp: "2025-01-15T09:00:00Z"
    }
  ]
}
```

## Status Workflow

Valid status transitions are enforced:

```javascript
const allowedTransitions = {
  "Draft": ["Submitted"],
  "Submitted": ["In Review"],
  "In Review": ["Approved", "Changes Requested"],
  "Changes Requested": ["Resubmitted"],
  "Resubmitted": ["In Review"],
  "Approved": [], // terminal state
}
```

## Implementation Phases

This was built in roughly these phases:

**Phase 1: Foundation**
- Set up constants (categories, statuses, file types)
- Create utility functions (formatters, validators)
- Configure Tailwind with KPMG brand colors

**Phase 2: Mock Data**
- Created sample documents in various workflow states
- Mock users (employees and reviewers)
- Set up React Context for global state

**Phase 3: Core Flow**
- Built main pages (Dashboard, Upload, Review)
- Wired up routing
- Connected components to context
- Implemented status transitions

**Phase 4: Upload Wizard**
- 4-step wizard (Category → Upload → Metadata → Review)
- Dynamic metadata forms based on selected category
- File validation and drag-and-drop

**Phase 5: Review System**
- Comment functionality
- Review actions (approve, request changes)
- Activity timeline
- Status banners for notifications

**Phase 6: Polish**
- Responsive design
- Empty states
- Error handling
- Accessibility improvements
- localStorage persistence

## Key Decisions

**State Management**
- Using React Context instead of Redux/Zustand
- Simple enough for this scope
- Could be swapped out easily if needed

**No Backend**
- Everything runs in the browser
- localStorage for persistence
- File uploads are simulated (stored in memory)

**Mock Data Approach**
- Realistic sample documents showing all workflow states
- Makes it easy to demo the full flow
- localStorage lets you add/modify data and have it persist

**Reviewer Assignment**
- Pre-assigned in mock data
- Real app would need assignment logic

**Notifications**
- In-app banners only
- Real app would need email notifications

**File Storage**
- Files not actually uploaded anywhere
- Real app needs cloud storage (S3, Azure Blob, etc.)

## Status Messages

Each status change triggers a contextual banner:

```javascript
const bannerMessages = {
  "Submitted": {
    type: "success",
    message: "Your document has been submitted for review."
  },
  "In Review": {
    type: "info",
    message: "Your document is currently being reviewed."
  },
  "Changes Requested": {
    type: "warning",
    message: "Reviewer has requested changes to your document."
  },
  "Approved": {
    type: "success",
    message: "Your document has been approved!"
  }
}
```

Banners auto-dismiss after 5 seconds but can be manually closed.

## Design System

Tailwind configured with KPMG brand:
- Primary: #0E64BC (KPMG blue)
- Success: #22C55E
- Warning: #F59E0B
- Error: #EF4444
- Neutral: Slate palette

Typography uses Manrope variable font.

## What's Working

- Complete upload flow with drag-and-drop
- Dynamic metadata forms
- Full 6-stage workflow
- Comment system
- Activity timeline
- Status banners
- Dashboard with statistics
- localStorage persistence
- Responsive design
- Role switching for demo

## Known Limitations

- No real backend or API
- No authentication
- File uploads don't go anywhere
- Single user session
- No search or filtering
- No pagination
- Email notifications not implemented

## What Would Be Needed for Production

- REST/GraphQL API
- Database (PostgreSQL, MongoDB, etc.)
- File upload to cloud storage
- Real authentication and authorization
- Email notification system
- Real-time updates (WebSockets)
- Search and filtering
- Pagination for large datasets
- Audit logging
- Document versioning
- Multi-user collaboration
- Proper error handling and monitoring
- Unit and integration tests
- E2E tests for critical flows

## Testing Strategy

If this were production code, would add:
- Unit tests for utilities and validators
- Component tests for UI components
- Integration tests for workflow logic
- E2E tests with Playwright/Cypress for:
  - Full upload flow
  - Review and approval flow
  - Status transitions
  - Error states

## Notes

- Built with React 19 and Vite
- TypeScript used for type-safe upload components
- Tailwind CSS 4 for styling
- Lucide React for icons (professional look, no emojis)
- Mobile-first responsive design
- All functional components with hooks
- Minimal comments (code should be clear)
