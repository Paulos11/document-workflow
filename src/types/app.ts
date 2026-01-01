import type { DocumentStatus } from '../constants/statuses';

export interface DocumentFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface DocumentMetadata {
  title: string;
  expirationDate?: string;
  issuingAuthority?: string;
  documentNumber?: string;
  description?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  institution?: string;
  dateObtained?: string;
  issueDate?: string;
}

export interface DocumentComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface DocumentActivity {
  id: string;
  type: string;
  action: string;
  description: string;
  user: string;
  timestamp: string;
}

export interface AppDocument {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  status: DocumentStatus;
  uploadedBy: string;
  uploadedDate: string;
  reviewer?: string;
  metadata: DocumentMetadata;
  files: DocumentFile[];
  comments: DocumentComment[];
  activities: DocumentActivity[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department?: string;
}

export interface ReviewerOption {
  value: string;
  label: string;
}

export interface Notification {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isVisible: boolean;
}

export interface StatusBanner {
  status: DocumentStatus;
}
