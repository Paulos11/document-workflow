export const DOCUMENT_STATUSES = {
  'Draft': {
    label: 'Draft',
    variant: 'default',
    color: '#94A3B8'
  },
  'Submitted': {
    label: 'Submitted',
    variant: 'warning',
    color: '#F59E0B'
  },
  'In Review': {
    label: 'In Review',
    variant: 'warning',
    color: '#F59E0B'
  },
  'Changes Requested': {
    label: 'Changes Requested',
    variant: 'orange',
    color: '#F97316'
  },
  'Resubmitted': {
    label: 'Resubmitted',
    variant: 'purple',
    color: '#8B5CF6'
  },
  'Approved': {
    label: 'Approved',
    variant: 'success',
    color: '#22C55E'
  }
};

export const STATUS_TRANSITIONS = {
  'Draft': ['Submitted'],
  'Submitted': ['In Review'],
  'In Review': ['Approved', 'Changes Requested'],
  'Changes Requested': ['Resubmitted'],
  'Resubmitted': ['In Review'],
  'Approved': []
};

export const STATUS_BANNERS = {
  'Draft': {
    type: 'info',
    message: 'Your document has been saved as a draft.'
  },
  'Submitted': {
    type: 'success',
    message: 'Your document has been submitted for review.'
  },
  'In Review': {
    type: 'info',
    message: 'Your document is currently being reviewed.'
  },
  'Changes Requested': {
    type: 'warning',
    message: 'Reviewer requested changes.'
  },
  'Resubmitted': {
    type: 'info',
    message: 'Your document has been resubmitted for review.'
  },
  'Approved': {
    type: 'success',
    message: 'Your document has been approved.'
  }
};

export const canTransitionTo = (currentStatus, newStatus) => {
  return STATUS_TRANSITIONS[currentStatus]?.includes(newStatus) || false;
};
