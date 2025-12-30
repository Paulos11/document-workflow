export const MOCK_USERS = {
  employees: [
    { id: 1, name: 'Sarah Johnes', email: 'sarah.johnes@company.com', role: 'Employee' },
    { id: 2, name: 'John Doe', email: 'john.doe@company.com', role: 'Employee' },
    { id: 3, name: 'Jane Smith', email: 'jane.smith@company.com', role: 'Employee' }
  ],
  reviewers: [
    { id: 4, name: 'Michael Chen', email: 'michael.chen@company.com', role: 'Reviewer', department: 'HR' },
    { id: 5, name: 'Emily Brown', email: 'emily.brown@company.com', role: 'Reviewer', department: 'Compliance' },
    { id: 6, name: 'David Wilson', email: 'david.wilson@company.com', role: 'Reviewer', department: 'Operations' }
  ]
};

export const getCurrentUser = () => {
  return MOCK_USERS.employees[0]; // Sarah Johnes
};

export const getReviewerOptions = () => {
  return MOCK_USERS.reviewers.map(reviewer => ({
    value: reviewer.name,
    label: `${reviewer.name} (${reviewer.department})`
  }));
};
