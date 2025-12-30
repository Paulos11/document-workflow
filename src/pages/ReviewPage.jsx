import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import {
  FilePreview,
  MetadataDisplay,
  CommentsSection,
  ReviewActions,
} from '../components/review';
import ResubmitSection from '../components/review/ResubmitSection';
import { ActivityTimeline } from '../components/timeline';
import { Button, Card } from '../components/ui';
import { StatusBadge } from '../components/documents';
import { ChevronLeft, FileText, Send } from 'lucide-react';

export default function ReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { documents, addComment, updateDocumentStatus, updateDocument, currentRole, currentUser } = useApp();

  const document = documents.find(doc => doc.id === parseInt(id));

  const handleAddComment = (commentData) => {
    if (document) {
      addComment(document.id, commentData.text);
    }
  };

  const handleReviewAction = (actionType, feedback) => {
    if (!document) return;

    const statusMap = {
      'approve': 'Approved',
      'request-changes': 'Changes Requested'
    };

    const newStatus = statusMap[actionType];
    if (newStatus) {
      updateDocumentStatus(document.id, newStatus, feedback);
    }
  };

  const handleResubmit = (newFiles) => {
    if (!document) return;

    // Update document with new files
    updateDocument(document.id, {
      files: newFiles
    });

    // Change status to Resubmitted
    updateDocumentStatus(document.id, 'Resubmitted', 'Document updated with new files');
  };

  const handleSubmitDraft = () => {
    if (!document) return;
    updateDocumentStatus(document.id, 'Submitted', 'Document submitted for review');
  };

  if (!document) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-neutral-subtle rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-text-muted" />
          </div>
          <h2 className="text-xl font-semibold text-text-high mb-1">Document Not Found</h2>
          <p className="text-body-small text-text-muted mb-4">
            The document you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/dashboard')} size="small">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-text-muted hover:text-brand-primary transition-colors text-body-small font-medium group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </button>
      </div>

      {/* Enhanced Header */}
      <div className="border-b border-neutral-border pb-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-high mb-2">
              {document.name}
            </h1>
            <div className="flex items-center gap-3 text-body-small text-text-muted flex-wrap">
              <StatusBadge status={document.status} />
              <span>•</span>
              <span>{document.files?.length || 1} file{document.files?.length !== 1 ? 's' : ''}</span>
              <span>•</span>
              <span>Updated {new Date(document.uploadedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <p className="text-body text-text-muted">
          Review this document and provide your feedback
        </p>
      </div>

      {/* Optimized Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Main Content - 65% */}
        <div className="flex-1 lg:w-[65%] space-y-6 min-w-0">
          {/* Show Resubmit Section for employees when changes are requested */}
          {document.status === 'Changes Requested' &&
            currentRole === 'Employee' &&
            document.uploadedBy === currentUser.name && (
              <ResubmitSection onResubmit={handleResubmit} currentFiles={document.files || []} />
            )}

          <FilePreview files={document.files || []} uploadDate={new Date(document.uploadedDate).toLocaleDateString()} />
          <MetadataDisplay document={document} />
          <CommentsSection comments={document.comments || []} onAddComment={handleAddComment} />
        </div>

        {/* Sidebar - 35% Sticky */}
        <aside className="lg:w-[35%] lg:sticky lg:top-6 lg:self-start space-y-6 min-w-0">
          {/* Show Submit Draft Section for employees when status is Draft */}
          {document.status === 'Draft' &&
            currentRole === 'Employee' &&
            document.uploadedBy === currentUser.name && (
              <div className="bg-white border border-neutral-border rounded-lg shadow-small overflow-hidden">
                <div className="p-4 border-b border-neutral-border">
                  <h3 className="text-h3 text-text-high">Ready to Submit?</h3>
                  <p className="text-caption text-text-muted mt-1">
                    Submit your draft for review when ready.
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-neutral-subtle/50 rounded-md p-3">
                    <p className="text-caption text-text-muted mb-1">Current Status: Draft</p>
                    <p className="text-caption text-text-low">Click below to submit for reviewer approval</p>
                  </div>
                  <Button onClick={handleSubmitDraft} variant="primary" className="w-full flex items-center justify-center gap-2">
                    <Send className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">Submit for Review</span>
                  </Button>
                </div>
              </div>
            )}

          <ReviewActions onAction={handleReviewAction} currentRole={currentRole} />
          {document.activities && <ActivityTimeline activities={document.activities} />}

          {/* Assigned Personnel */}
          <div className="bg-white border border-neutral-border rounded-lg shadow-small overflow-hidden">
            <div className="p-4 border-b border-neutral-border">
              <h3 className="text-h3 text-text-high">Assigned Personnel</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-brand-primary">
                    {document.reviewer?.split(' ').map(n => n[0]).join('') || 'NA'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-caption text-text-muted">Reviewer</p>
                  <p className="text-body-small font-medium text-text-high">{document.reviewer || 'Unassigned'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-subtle rounded-full flex items-center justify-center flex-shrink-0 border border-neutral-border">
                  <span className="text-xs font-semibold text-text-medium">
                    {document.uploadedBy?.split(' ').map(n => n[0]).join('') || 'NA'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-caption text-text-muted">Uploaded By</p>
                  <p className="text-body-small font-medium text-text-high">{document.uploadedBy}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
