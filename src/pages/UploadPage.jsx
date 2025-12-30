import { UploadWizard } from '../components/documents/upload/UploadWizard';
import { useApp } from '../context';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileUp } from 'lucide-react';

export default function UploadPage() {
  const { addDocument, currentUser } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (documentData, status = 'Submitted') => {
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
      {/* Breadcrumb Navigation */}
      <div>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-text-muted hover:text-brand-primary transition-colors text-body-small font-medium group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </button>
      </div>

      {/* Page Header - More Compact */}
      <div className="border-b border-neutral-border pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-high mb-2">Submit New Document</h1>
        <p className="text-body text-text-muted">
          Follow the steps below to upload and submit your documents for review.
        </p>
      </div>

      {/* Upload Wizard */}
      <div className="max-w-5xl mx-auto">
        <UploadWizard
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
