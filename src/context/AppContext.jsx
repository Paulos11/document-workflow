import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_DOCUMENTS, getCurrentUser } from '../data';
import { STATUS_BANNERS } from '../constants';
import {
  saveToStorage,
  loadFromStorage,
  STORAGE_KEYS,
  isStorageAvailable
} from '../utils/storage';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Initialize state from localStorage or fallback to defaults
  const [documents, setDocuments] = useState(() => {
    const stored = loadFromStorage(STORAGE_KEYS.DOCUMENTS);
    return stored && stored.length > 0 ? stored : MOCK_DOCUMENTS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const stored = loadFromStorage(STORAGE_KEYS.USER);
    return stored || getCurrentUser();
  });

  const [currentRole, setCurrentRole] = useState(() => {
    return loadFromStorage(STORAGE_KEYS.ROLE) || 'Employee';
  });

  const [notification, setNotification] = useState(null);
  const [statusBanner, setStatusBanner] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Persist documents to localStorage whenever they change
  useEffect(() => {
    if (isStorageAvailable()) {
      saveToStorage(STORAGE_KEYS.DOCUMENTS, documents);
    }
  }, [documents]);

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (isStorageAvailable()) {
      saveToStorage(STORAGE_KEYS.USER, currentUser);
    }
  }, [currentUser]);

  // Persist role to localStorage whenever it changes
  useEffect(() => {
    if (isStorageAvailable()) {
      saveToStorage(STORAGE_KEYS.ROLE, currentRole);
    }
  }, [currentRole]);

  const addDocument = (documentData, status = 'Submitted') => {
    const isDraft = status === 'Draft';
    const actionText = isDraft ? 'Saved as Draft' : 'Document Uploaded';
    const descriptionText = isDraft
      ? `${documentData.name} saved as draft`
      : `${documentData.name} uploaded for review`;

    const newDocument = {
      id: Date.now(),
      ...documentData,
      uploadedBy: currentUser.name,
      uploadedDate: new Date().toISOString(),
      status: status,
      comments: [],
      activities: [
        {
          id: 1,
          type: isDraft ? 'draft' : 'upload',
          action: actionText,
          description: descriptionText,
          user: currentUser.name,
          timestamp: new Date().toISOString()
        }
      ]
    };

    setDocuments([...documents, newDocument]);

    // Show status banner
    setStatusBanner({ status: status });

    const notificationMessage = isDraft
      ? 'Document saved as draft successfully!'
      : 'Document uploaded successfully!';
    showNotification(notificationMessage, 'success');
    return newDocument;
  };

  const updateDocumentStatus = (documentId, newStatus, feedback = '') => {
    setDocuments(documents.map(doc => {
      if (doc.id === documentId) {
        const updatedDoc = {
          ...doc,
          status: newStatus,
          activities: [
            ...doc.activities,
            {
              id: doc.activities.length + 1,
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
              id: doc.comments.length + 1,
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

    // Show status banner
    setStatusBanner({ status: newStatus });

    const banner = STATUS_BANNERS[newStatus];
    if (banner) {
      showNotification(banner.message, banner.type);
    }
  };

  const hideStatusBanner = () => {
    setStatusBanner(null);
  };

  const addComment = (documentId, commentText) => {
    setDocuments(documents.map(doc => {
      if (doc.id === documentId) {
        return {
          ...doc,
          comments: [
            ...doc.comments,
            {
              id: doc.comments.length + 1,
              author: currentUser.name,
              text: commentText,
              timestamp: new Date().toISOString()
            }
          ],
          activities: [
            ...doc.activities,
            {
              id: doc.activities.length + 1,
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

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, isVisible: true });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const deleteDocument = (documentId) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
    showNotification('Document deleted successfully!', 'success');
    if (selectedDocument?.id === documentId) {
      setSelectedDocument(null);
    }
  };

  const updateDocument = (documentId, updatedData) => {
    setDocuments(documents.map(doc => {
      if (doc.id === documentId) {
        return {
          ...doc,
          ...updatedData,
          activities: [
            ...doc.activities,
            {
              id: doc.activities.length + 1,
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

  const switchRole = (newRole, userData = null) => {
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

  const value = {
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
    deleteDocument,
    updateDocument,
    switchRole,
    resetToDefaults
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
