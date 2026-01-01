import { UploadWizard } from '../components/documents/upload/UploadWizard';
import { useApp } from '../context';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { DocumentMetadata, DocumentFile } from '../types/app';
import type { DocumentStatus } from '../constants/statuses';

interface DocumentData {
  metadata: DocumentMetadata;
  category: string;
  documentType: string;
  files: DocumentFile[];
}

export default function UploadPage() {
  const { addDocument, currentUser } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (documentData: DocumentData, status: DocumentStatus = 'Submitted') => {
    const docToAdd = {
      name: documentData.metadata.title || 'Untitled Document',
      category: documentData.category,
      subcategory: documentData.documentType,
      metadata: documentData.metadata,
      files: documentData.files,
      reviewer: status === 'Draft' ? 'Unassigned' : 'Unassigned'
    };

    addDocument(docToAdd, status);
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-text-muted hover:text-brand-primary transition-colors text-body-small font-medium group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </button>
      </div>

      <div className="border-b border-neutral-border pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-high mb-2">Submit New Document</h1>
        <p className="text-body text-text-muted">
          Follow the steps below to upload and submit your documents for review.
        </p>
      </div>

      <UploadWizard
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        currentUser={currentUser}
      />
    </div>
  );
}
