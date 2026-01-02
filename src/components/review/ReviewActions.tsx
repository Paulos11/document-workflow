import { useState } from 'react';
import { Card, Button, Modal } from '../ui';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ReviewActionsProps {
  onAction: (actionType: string, feedback?: string) => void;
  currentRole: string;
}

export default function ReviewActions({ onAction, currentRole }: ReviewActionsProps) {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [feedback, setFeedback] = useState('');

  const isReviewer = currentRole === 'Reviewer';

  const handleAction = (type: string) => {
    if (!isReviewer) return;

    setActionType(type);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (actionType === 'request-changes' && feedback.trim().length === 0) {
      return;
    }

    onAction(actionType, feedback || undefined);
    setShowModal(false);
    setFeedback('');
    setActionType('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <Card padding="none">
        <div className="p-4 border-b border-neutral-border">
          <h3 className="text-h3 text-text-high">Review Actions</h3>
          {!isReviewer && (
            <p className="text-caption text-text-muted mt-1">
              Only reviewers can approve or request changes
            </p>
          )}
        </div>

        <div className="p-4 space-y-2">
          <Button
            variant="success"
            className="w-full flex items-center justify-center gap-2 py-2.5"
            onClick={() => handleAction('approve')}
            disabled={!isReviewer}
            aria-label="Approve document"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Approve</span>
          </Button>

          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-2 py-2.5"
            onClick={() => handleAction('request-changes')}
            disabled={!isReviewer}
            aria-label="Request changes to document"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Request Changes</span>
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={actionType === 'approve' ? 'Approve Document' : 'Request Changes'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant={actionType === 'approve' ? 'success' : 'error'}
              onClick={handleSubmit}
              disabled={actionType === 'request-changes' && feedback.trim().length === 0}
            >
              {actionType === 'approve' ? 'Confirm Approval' : 'Request Changes'}
            </Button>
          </>
        }
      >
        <div className="space-y-2">
          <label className="block">
            <span className="text-body-small font-medium text-text-high mb-1.5 block">
              {actionType === 'approve' ? 'Feedback (optional)' : 'What needs to be changed? (Required)'}
            </span>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                actionType === 'approve'
                  ? 'Add any notes...'
                  : 'What needs to be changed?'
              }
              className="w-full px-3 py-2 border border-neutral-border rounded-md text-body-small focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary min-h-[80px] resize-none"
              maxLength={500}
              aria-label={actionType === 'approve' ? 'Approval feedback' : 'Change request feedback'}
            />
          </label>
          <div className="flex items-center justify-end">
            <span className="text-caption text-text-muted">
              {feedback.length}/500 characters
            </span>
          </div>
          {actionType === 'request-changes' && feedback.trim().length === 0 && (
            <p className="text-caption text-orange-600">
              Let them know what needs fixing
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}
