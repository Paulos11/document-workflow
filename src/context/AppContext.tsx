import { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { MOCK_DOCUMENTS, getCurrentUser } from '../data';
import { STATUS_BANNERS, canTransitionTo } from '../constants';
import type { DocumentStatus, BannerType } from '../constants';
import {
  saveToStorage,
  loadFromStorage,
  STORAGE_KEYS,
  isStorageAvailable
} from '../utils/storage';
import type { AppDocument, User, Notification, StatusBanner, DocumentMetadata } from '../types/app';

interface AppContextValue {
  documents: AppDocument[];
  currentUser: User;
  currentRole: string;
  notification: Notification | null;
  statusBanner: StatusBanner | null;
  selectedDocument: AppDocument | null;
  setSelectedDocument: (doc: AppDocument | null) => void;
  addDocument: (documentData: Partial<AppDocument>, status?: DocumentStatus) => AppDocument;
  updateDocumentStatus: (documentId: string, newStatus: DocumentStatus, feedback?: string) => void;
  addComment: (documentId: string, commentText: string) => void;
  showNotification: (message: string, type?: BannerType | 'error') => void;
  hideNotification: () => void;
  hideStatusBanner: () => void;
  updateDocument: (documentId: string, updatedData: Partial<AppDocument>) => void;
  resubmitDocument: (documentId: string, updatedData: Partial<AppDocument>, feedback?: string) => void;
  switchRole: (newRole: string, userData?: User | null) => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const useApp = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [documents, setDocuments] = useState<AppDocument[]>(() => {
    const stored = loadFromStorage<AppDocument[]>(STORAGE_KEYS.DOCUMENTS);
    return stored && stored.length > 0 ? stored : MOCK_DOCUMENTS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const stored = loadFromStorage<User>(STORAGE_KEYS.USER);
    return stored || getCurrentUser();
  });

  const [currentRole, setCurrentRole] = useState<string>(() => {
    return loadFromStorage<string>(STORAGE_KEYS.ROLE) || 'Employee';
  });

  const [notification, setNotification] = useState<Notification | null>(null);
  const [statusBanner, setStatusBanner] = useState<StatusBanner | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<AppDocument | null>(null);
  const notificationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (isStorageAvailable()) {
      saveToStorage(STORAGE_KEYS.DOCUMENTS, documents);
    }
  }, [documents]);

  useEffect(() => {
    if (isStorageAvailable()) {
      saveToStorage(STORAGE_KEYS.USER, currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isStorageAvailable()) {
      saveToStorage(STORAGE_KEYS.ROLE, currentRole);
    }
  }, [currentRole]);

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const addDocument = (documentData: Partial<AppDocument>, status: DocumentStatus = 'Submitted'): AppDocument => {
    const isDraft = status === 'Draft';
    const actionText = isDraft ? 'Saved as Draft' : 'Document Uploaded';
    const descriptionText = isDraft
      ? `${documentData.name} saved as draft`
      : `${documentData.name} uploaded for review`;

    const newDocument: AppDocument = {
      id: crypto.randomUUID(),
      name: documentData.name || '',
      category: documentData.category || '',
      subcategory: documentData.subcategory || '',
      uploadedBy: currentUser.name,
      uploadedDate: new Date().toISOString(),
      status: status,
      metadata: documentData.metadata || {} as DocumentMetadata,
      files: documentData.files || [],
      comments: [],
      activities: [
        {
          id: crypto.randomUUID(),
          type: isDraft ? 'draft' : 'upload',
          action: actionText,
          description: descriptionText,
          user: currentUser.name,
          timestamp: new Date().toISOString()
        }
      ]
    };

    setDocuments(prevDocuments => [...prevDocuments, newDocument]);

    setStatusBanner({ status: status });

    const notificationMessage = isDraft
      ? 'Document saved as draft successfully!'
      : 'Document uploaded successfully!';
    showNotification(notificationMessage, 'success');
    return newDocument;
  };

  const updateDocumentStatus = (documentId: string, newStatus: DocumentStatus, feedback: string = '') => {
    setDocuments(prevDocuments => prevDocuments.map(doc => {
      if (doc.id === documentId) {
        // Validate status transition
        if (!canTransitionTo(doc.status, newStatus)) {
          console.warn(`Invalid status transition from ${doc.status} to ${newStatus}`);
          return doc;
        }

        const updatedDoc = {
          ...doc,
          status: newStatus,
          activities: [
            ...doc.activities,
            {
              id: crypto.randomUUID(),
              type: newStatus.toLowerCase().replace(' ', '-'),
              action: `Status Changed to ${newStatus}`,
              description: feedback || `Document status updated to ${newStatus}`,
              user: currentUser.name,
              timestamp: new Date().toISOString()
            }
          ]
        };

        if (feedback) {
          updatedDoc.comments = [
            ...doc.comments,
            {
              id: crypto.randomUUID(),
              author: currentUser.name,
              text: feedback,
              timestamp: new Date().toISOString()
            }
          ];
        }

        return updatedDoc;
      }
      return doc;
    }));

    setStatusBanner({ status: newStatus });

    const banner = STATUS_BANNERS[newStatus];
    if (banner) {
      showNotification(banner.message, banner.type);
    }
  };

  const hideStatusBanner = () => {
    setStatusBanner(null);
  };

  const addComment = (documentId: string, commentText: string) => {
    setDocuments(prevDocuments => prevDocuments.map(doc => {
      if (doc.id === documentId) {
        return {
          ...doc,
          comments: [
            ...doc.comments,
            {
              id: crypto.randomUUID(),
              author: currentUser.name,
              text: commentText,
              timestamp: new Date().toISOString()
            }
          ],
          activities: [
            ...doc.activities,
            {
              id: crypto.randomUUID(),
              type: 'comment',
              action: 'Comment Added',
              description: commentText,
              user: currentUser.name,
              timestamp: new Date().toISOString()
            }
          ]
        };
      }
      return doc;
    }));
  };

  const showNotification = (message: string, type: BannerType | 'error' = 'info') => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification({ message, type: type as Notification['type'], isVisible: true });
    notificationTimeoutRef.current = window.setTimeout(() => {
      setNotification(null);
      notificationTimeoutRef.current = null;
    }, 5000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const updateDocument = (documentId: string, updatedData: Partial<AppDocument>) => {
    setDocuments(prevDocuments => prevDocuments.map(doc => {
      if (doc.id === documentId) {
        return {
          ...doc,
          ...updatedData,
          metadata: updatedData.metadata ? {
            ...doc.metadata,
            ...updatedData.metadata
          } : doc.metadata,
          activities: [
            ...doc.activities,
            {
              id: crypto.randomUUID(),
              type: 'update',
              action: 'Document Updated',
              description: 'Document information has been updated',
              user: currentUser.name,
              timestamp: new Date().toISOString()
            }
          ]
        };
      }
      return doc;
    }));
    showNotification('Document updated successfully!', 'success');
  };

  const resubmitDocument = (documentId: string, updatedData: Partial<AppDocument>, feedback: string = 'Document updated and resubmitted') => {
    setDocuments(prevDocuments => prevDocuments.map(doc => {
      if (doc.id === documentId) {
        const newStatus: DocumentStatus = 'Resubmitted';

        // Validate status transition
        if (!canTransitionTo(doc.status, newStatus)) {
          console.warn(`Invalid status transition from ${doc.status} to ${newStatus}`);
          return doc;
        }

        // Combine both document update and status change in one operation
        return {
          ...doc,
          ...updatedData,
          status: newStatus,
          metadata: updatedData.metadata ? {
            ...doc.metadata,
            ...updatedData.metadata
          } : doc.metadata,
          files: updatedData.files || doc.files,
          activities: [
            ...doc.activities,
            {
              id: crypto.randomUUID(),
              type: 'update',
              action: 'Document Updated',
              description: 'Document information has been updated',
              user: currentUser.name,
              timestamp: new Date().toISOString()
            },
            {
              id: crypto.randomUUID(),
              type: 'resubmitted',
              action: 'Status Changed to Resubmitted',
              description: feedback,
              user: currentUser.name,
              timestamp: new Date().toISOString()
            }
          ],
          comments: feedback ? [
            ...doc.comments,
            {
              id: crypto.randomUUID(),
              author: currentUser.name,
              text: feedback,
              timestamp: new Date().toISOString()
            }
          ] : doc.comments
        };
      }
      return doc;
    }));

    setStatusBanner({ status: 'Resubmitted' });

    const banner = STATUS_BANNERS['Resubmitted'];
    if (banner) {
      showNotification(banner.message, banner.type);
    }
  };

  const switchRole = (newRole: string, userData: User | null = null) => {
    setCurrentRole(newRole);
    if (newRole === 'Employee') {
      setCurrentUser(getCurrentUser());
    } else if (newRole === 'Reviewer' && userData) {
      setCurrentUser({ ...userData, role: 'Reviewer' });
    }
  };

  const resetToDefaults = () => {
    setDocuments(MOCK_DOCUMENTS);
    setCurrentUser(getCurrentUser());
    setCurrentRole('Employee');
    setSelectedDocument(null);
    showNotification('Data reset to defaults', 'info');
  };

  const value: AppContextValue = {
    documents,
    currentUser,
    currentRole,
    notification,
    statusBanner,
    selectedDocument,
    setSelectedDocument,
    addDocument,
    updateDocumentStatus,
    addComment,
    showNotification,
    hideNotification,
    hideStatusBanner,
    updateDocument,
    resubmitDocument,
    switchRole,
    resetToDefaults
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
