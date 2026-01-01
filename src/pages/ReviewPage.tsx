import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import {
  FilePreview,
  MetadataDisplay,
  CommentsSection,
  ReviewActions,
} from '../components/review';
import { ActivityTimeline } from '../components/timeline';
import { Button } from '../components/ui';
import { StatusBadge } from '../components/documents';
import { ChevronLeft, FileText, Send, Save } from 'lucide-react';
import type { DocumentFile, AppDocument } from '../types/app';

interface CommentData {
  text: string;
}

export default function ReviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { documents, addComment, updateDocumentStatus, resubmitDocument, currentRole, currentUser } = useApp();

  const document = documents.find(doc => doc.id === id);

  const [editedDocument, setEditedDocument] = useState<AppDocument | null>(null);

  const isOwner = document && document.uploadedBy === currentUser.name;
  const canEdit = isOwner && (document?.status === 'Draft' || document?.status === 'Changes Requested');
  const isEditMode = canEdit && document?.status === 'Changes Requested';

  const displayDocument = editedDocument || document;

  const handleAddComment = (commentData: CommentData) => {
    if (document) {
      addComment(document.id, commentData.text);
    }
  };

  const handleReviewAction = (actionType: string, feedback?: string) => {
    if (!document) return;

    const statusMap: Record<string, 'Approved' | 'Changes Requested'> = {
      'approve': 'Approved',
      'request-changes': 'Changes Requested'
    };

    const newStatus = statusMap[actionType];
    if (newStatus) {
      updateDocumentStatus(document.id, newStatus, feedback);
    }
  };

  const handleMetadataChange = (field: string, value: string) => {
    if (!document) return;

    const updated = editedDocument || { ...document };
    setEditedDocument({
      ...updated,
      metadata: {
        ...updated.metadata,
        [field]: value
      }
    });
  };

  const handleFilesChange = (newFiles: DocumentFile[]) => {
    if (!document) return;

    const updated = editedDocument || { ...document };
    setEditedDocument({
      ...updated,
      files: newFiles
    });
  };

  const handleSaveChanges = () => {
    if (!document || !editedDocument) return;

    resubmitDocument(document.id, {
      files: editedDocument.files,
      metadata: editedDocument.metadata
    }, 'Document updated and resubmitted');

    setEditedDocument(null);
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
      <div>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-text-muted hover:text-brand-primary transition-colors text-body-small font-medium group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </button>
      </div>

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

      {isEditMode && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h3 className="text-body-medium font-semibold text-orange-900 mb-1">Edit Mode</h3>
              <p className="text-body-small text-orange-700">
                Make your changes to the document metadata and files below, then click "Save Changes & Resubmit" to update the document.
              </p>
            </div>
            <Button
              onClick={handleSaveChanges}
              variant="primary"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Save className="w-4 h-4" />
              Save Changes & Resubmit
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-1 lg:w-[65%] space-y-6 min-w-0">
          <FilePreview
            files={displayDocument?.files || []}
            editable={isEditMode}
            onFilesChange={handleFilesChange}
          />
          <MetadataDisplay
            document={displayDocument!}
            editable={isEditMode}
            onChange={handleMetadataChange}
          />
          <CommentsSection comments={document.comments || []} onAddComment={handleAddComment} />
        </div>

        <aside className="lg:w-[35%] lg:sticky lg:top-6 lg:self-start space-y-6 min-w-0">
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

          {/* Only show review actions if document can be reviewed */}
          {(document.status === 'Submitted' ||
            document.status === 'In Review' ||
            document.status === 'Resubmitted') && (
            <ReviewActions onAction={handleReviewAction} currentRole={currentRole} />
          )}

          {/* Show status message for approved documents */}
          {document.status === 'Approved' && currentRole === 'Reviewer' && (
            <div className="bg-white border border-neutral-border rounded-lg shadow-small overflow-hidden">
              <div className="p-4 border-b border-neutral-border">
                <h3 className="text-h3 text-text-high">Document Approved</h3>
              </div>
              <div className="p-4">
                <div className="bg-green-50 rounded-md p-3">
                  <p className="text-caption text-green-800">
                    This document has been approved and is no longer under review.
                  </p>
                </div>
              </div>
            </div>
          )}

          {document.activities && <ActivityTimeline activities={document.activities} />}
        </aside>
      </div>
    </div>
  );
}
