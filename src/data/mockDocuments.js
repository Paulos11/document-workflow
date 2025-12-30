export const MOCK_DOCUMENTS = [
  {
    id: 1,
    name: "Driver's License - Sarah Johnes",
    category: 'Identification Documents',
    subcategory: "Driver's License",
    status: 'Approved',
    uploadedBy: 'Sarah Johnes',
    uploadedDate: '2025-01-10T09:00:00Z',
    reviewer: 'Michael Chen',
    metadata: {
      title: "Driver's License - Sarah Johnes",
      expirationDate: '2028-12-31',
      issuingAuthority: 'Department of Motor Vehicles',
      documentNumber: 'DL-8392847',
      description: 'Valid driver license for personal vehicle operation'
    },
    files: [
      { id: '1a', name: 'drivers_license_front.pdf', size: 245600, type: 'application/pdf' },
      { id: '1b', name: 'drivers_license_back.pdf', size: 198400, type: 'application/pdf' }
    ],
    comments: [
      {
        id: 1,
        author: 'Michael Chen',
        text: 'Document verified and approved.',
        timestamp: '2025-01-11T14:30:00Z'
      }
    ],
    activities: [
      {
        id: 1,
        type: 'upload',
        action: 'Document Uploaded',
        description: "Driver's License uploaded for review",
        user: 'Sarah Johnes',
        timestamp: '2025-01-10T09:00:00Z'
      },
      {
        id: 2,
        type: 'review',
        action: 'Review Started',
        description: 'Document review initiated',
        user: 'Michael Chen',
        timestamp: '2025-01-11T10:00:00Z'
      },
      {
        id: 3,
        type: 'approved',
        action: 'Document Approved',
        description: 'Document has been approved',
        user: 'Michael Chen',
        timestamp: '2025-01-11T14:30:00Z'
      }
    ]
  },
  {
    id: 2,
    name: 'Employment Contract 2025',
    category: 'Employment Documents',
    subcategory: 'Employment Contract',
    status: 'Submitted',
    uploadedBy: 'Sarah Johnes',
    uploadedDate: '2025-01-15T11:30:00Z',
    reviewer: 'Emily Brown',
    metadata: {
      title: 'Employment Contract 2025',
      contractStartDate: '2025-02-01',
      contractEndDate: '2026-02-01',
      description: 'Annual employment contract renewal'
    },
    files: [
      { id: '2a', name: 'employment_contract_2025.pdf', size: 512000, type: 'application/pdf' }
    ],
    comments: [],
    activities: [
      {
        id: 1,
        type: 'upload',
        action: 'Document Uploaded',
        description: 'Employment Contract uploaded for review',
        user: 'Sarah Johnes',
        timestamp: '2025-01-15T11:30:00Z'
      }
    ]
  },
  {
    id: 3,
    name: 'US Passport - Sarah Johnes',
    category: 'Identification Documents',
    subcategory: 'Passport',
    status: 'Changes Requested',
    uploadedBy: 'Sarah Johnes',
    uploadedDate: '2025-01-12T14:00:00Z',
    reviewer: 'Michael Chen',
    metadata: {
      title: 'US Passport - Sarah Johnes',
      expirationDate: '2030-06-15',
      issuingAuthority: 'US Department of State',
      documentNumber: 'P5839204',
      description: 'Current valid passport'
    },
    files: [
      { id: '3a', name: 'passport_scan.pdf', size: 1843200, type: 'application/pdf' }
    ],
    comments: [
      {
        id: 1,
        author: 'Michael Chen',
        text: 'Please upload a clearer scan. The photo page is slightly blurry.',
        timestamp: '2025-01-13T09:15:00Z'
      }
    ],
    activities: [
      {
        id: 1,
        type: 'upload',
        action: 'Document Uploaded',
        description: 'Passport uploaded for review',
        user: 'Sarah Johnes',
        timestamp: '2025-01-12T14:00:00Z'
      },
      {
        id: 2,
        type: 'review',
        action: 'Review Started',
        description: 'Document review initiated',
        user: 'Michael Chen',
        timestamp: '2025-01-13T09:00:00Z'
      },
      {
        id: 3,
        type: 'changes-requested',
        action: 'Changes Requested',
        description: 'Reviewer requested document updates',
        user: 'Michael Chen',
        timestamp: '2025-01-13T09:15:00Z'
      }
    ]
  },
  {
    id: 4,
    name: 'CPA License - John Anderson',
    category: 'Educational & Certification Documents',
    subcategory: 'Professional Certification',
    status: 'In Review',
    uploadedBy: 'John Anderson',
    uploadedDate: '2025-01-18T10:00:00Z',
    reviewer: 'Emily Brown',
    metadata: {
      title: 'CPA License - John Anderson',
      issuingAuthority: 'State Board of Accountancy',
      dateObtained: '2024-12-15',
      description: 'Certified Public Accountant professional certification'
    },
    files: [
      { id: '4a', name: 'cpa_certificate.pdf', size: 678900, type: 'application/pdf' }
    ],
    comments: [],
    activities: [
      {
        id: 1,
        type: 'upload',
        action: 'Document Uploaded',
        description: 'Professional Certification uploaded for review',
        user: 'John Anderson',
        timestamp: '2025-01-18T10:00:00Z'
      },
      {
        id: 2,
        type: 'review',
        action: 'Review Started',
        description: 'Document review initiated',
        user: 'Emily Brown',
        timestamp: '2025-01-19T09:00:00Z'
      }
    ]
  },
  {
    id: 5,
    name: 'Proof of Address - Utility Bill January 2025',
    category: 'Supporting Documents',
    subcategory: 'Utility Bill',
    status: 'Approved',
    uploadedBy: 'Maria Garcia',
    uploadedDate: '2025-01-20T14:30:00Z',
    reviewer: 'Michael Chen',
    metadata: {
      title: 'Proof of Address - Utility Bill January 2025',
      issueDate: '2025-01-05',
      description: 'Electricity bill for address verification'
    },
    files: [
      { id: '5a', name: 'utility_bill_jan_2025.pdf', size: 342800, type: 'application/pdf' }
    ],
    comments: [
      {
        id: 1,
        author: 'Michael Chen',
        text: 'Address confirmed. Document approved.',
        timestamp: '2025-01-21T10:00:00Z'
      }
    ],
    activities: [
      {
        id: 1,
        type: 'upload',
        action: 'Document Uploaded',
        description: 'Utility Bill uploaded for review',
        user: 'Maria Garcia',
        timestamp: '2025-01-20T14:30:00Z'
      },
      {
        id: 2,
        type: 'review',
        action: 'Review Started',
        description: 'Document review initiated',
        user: 'Michael Chen',
        timestamp: '2025-01-21T09:30:00Z'
      },
      {
        id: 3,
        type: 'approved',
        action: 'Document Approved',
        description: 'Document has been approved',
        user: 'Michael Chen',
        timestamp: '2025-01-21T10:00:00Z'
      }
    ]
  },
  {
    id: 6,
    name: 'Bachelor of Science in Computer Science',
    category: 'Educational & Certification Documents',
    subcategory: 'Degree',
    status: 'Resubmitted',
    uploadedBy: 'David Lee',
    uploadedDate: '2025-01-14T11:00:00Z',
    reviewer: 'Emily Brown',
    metadata: {
      title: 'Bachelor of Science in Computer Science',
      institution: 'State University',
      dateObtained: '2022-05-20',
      description: 'Undergraduate degree certificate'
    },
    files: [
      { id: '6a', name: 'degree_certificate.pdf', size: 891200, type: 'application/pdf' },
      { id: '6b', name: 'degree_certificate_notarized.pdf', size: 934500, type: 'application/pdf' }
    ],
    comments: [
      {
        id: 1,
        author: 'Emily Brown',
        text: 'Please provide a notarized copy of the degree.',
        timestamp: '2025-01-16T14:00:00Z'
      },
      {
        id: 2,
        author: 'David Lee',
        text: 'Notarized copy uploaded.',
        timestamp: '2025-01-22T09:00:00Z'
      }
    ],
    activities: [
      {
        id: 1,
        type: 'upload',
        action: 'Document Uploaded',
        description: 'Degree uploaded for review',
        user: 'David Lee',
        timestamp: '2025-01-14T11:00:00Z'
      },
      {
        id: 2,
        type: 'review',
        action: 'Review Started',
        description: 'Document review initiated',
        user: 'Emily Brown',
        timestamp: '2025-01-16T13:00:00Z'
      },
      {
        id: 3,
        type: 'changes-requested',
        action: 'Changes Requested',
        description: 'Reviewer requested document updates',
        user: 'Emily Brown',
        timestamp: '2025-01-16T14:00:00Z'
      },
      {
        id: 4,
        type: 'resubmit',
        action: 'Document Resubmitted',
        description: 'Updated document resubmitted for review',
        user: 'David Lee',
        timestamp: '2025-01-22T09:00:00Z'
      }
    ]
  }
];

export const getDocumentById = (id) => {
  return MOCK_DOCUMENTS.find(doc => doc.id === id);
};

export const getDocumentsByStatus = (status) => {
  if (!status || status === 'All Status') return MOCK_DOCUMENTS;
  return MOCK_DOCUMENTS.filter(doc => doc.status === status);
};

export const getStatusCounts = (documents) => {
  return documents.reduce((acc, doc) => {
    acc[doc.status] = (acc[doc.status] || 0) + 1;
    return acc;
  }, {});
};
