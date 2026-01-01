import { CheckCircle, AlertCircle, Info, Clock, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type DocumentStatus =
  | 'Draft'
  | 'Submitted'
  | 'In Review'
  | 'Changes Requested'
  | 'Resubmitted'
  | 'Approved';

export type StatusVariant = 'default' | 'warning' | 'orange' | 'purple' | 'success';
export type BannerType = 'info' | 'success' | 'warning';

export interface StatusStyleConfig {
  label: string;
  variant: StatusVariant;
  badge: {
    textColor: string;
    dotColor: string;
  };
  banner: {
    icon: LucideIcon;
    bgColor: string;
    borderColor: string;
    iconColor: string;
    textColor: string;
    message: string;
  };
  summary: {
    textColor: string;
    bgColor: string;
  };
}

export interface StatusBanner {
  type: BannerType;
  message: string;
}

export const STATUS_CONFIGS: Record<DocumentStatus, StatusStyleConfig> = {
  'Draft': {
    label: 'Draft',
    variant: 'default',
    badge: {
      textColor: 'text-text-medium',
      dotColor: 'bg-neutral-border-strong'
    },
    banner: {
      icon: FileText,
      bgColor: 'bg-neutral-subtle',
      borderColor: 'border-neutral-border-strong',
      iconColor: 'text-text-medium',
      textColor: 'text-text-high',
      message: 'Your document has been saved as a draft.'
    },
    summary: {
      textColor: 'text-text-medium',
      bgColor: 'bg-neutral-subtle'
    }
  },
  'Submitted': {
    label: 'Submitted',
    variant: 'warning',
    badge: {
      textColor: 'text-status-warning-dark',
      dotColor: 'bg-status-warning'
    },
    banner: {
      icon: Clock,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
      message: 'Your document has been submitted for review.'
    },
    summary: {
      textColor: 'text-status-warning',
      bgColor: 'bg-status-warning-light'
    }
  },
  'In Review': {
    label: 'In Review',
    variant: 'warning',
    badge: {
      textColor: 'text-status-orange-dark',
      dotColor: 'bg-status-orange'
    },
    banner: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
      message: 'Your document is currently under review.'
    },
    summary: {
      textColor: 'text-status-orange',
      bgColor: 'bg-status-orange-light'
    }
  },
  'Changes Requested': {
    label: 'Changes Requested',
    variant: 'orange',
    badge: {
      textColor: 'text-status-error-dark',
      dotColor: 'bg-status-error'
    },
    banner: {
      icon: AlertCircle,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconColor: 'text-orange-600',
      textColor: 'text-orange-900',
      message: 'Reviewer requested changes to your document.'
    },
    summary: {
      textColor: 'text-status-error',
      bgColor: 'bg-status-error-light'
    }
  },
  'Resubmitted': {
    label: 'Resubmitted',
    variant: 'purple',
    badge: {
      textColor: 'text-status-purple-dark',
      dotColor: 'bg-status-purple'
    },
    banner: {
      icon: Clock,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
      message: 'Your document has been resubmitted for review.'
    },
    summary: {
      textColor: 'text-status-purple',
      bgColor: 'bg-status-purple-light'
    }
  },
  'Approved': {
    label: 'Approved',
    variant: 'success',
    badge: {
      textColor: 'text-status-success-dark',
      dotColor: 'bg-status-success'
    },
    banner: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
      message: 'Your document has been approved.'
    },
    summary: {
      textColor: 'text-status-success',
      bgColor: 'bg-status-success-light'
    }
  }
};

export const STATUS_TRANSITIONS: Record<DocumentStatus, DocumentStatus[]> = {
  'Draft': ['Submitted'],
  'Submitted': ['In Review', 'Approved', 'Changes Requested'],
  'In Review': ['Approved', 'Changes Requested'],
  'Changes Requested': ['Resubmitted'],
  'Resubmitted': ['In Review', 'Approved', 'Changes Requested'],
  'Approved': []
};

export const STATUS_BANNERS: Record<DocumentStatus, StatusBanner> = {
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

export const canTransitionTo = (currentStatus: DocumentStatus, newStatus: DocumentStatus): boolean => {
  return STATUS_TRANSITIONS[currentStatus]?.includes(newStatus) || false;
};
