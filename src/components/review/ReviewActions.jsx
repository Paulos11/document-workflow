import { useState } from 'react';
import { Card, Button, Modal } from '../ui';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function ReviewActions({ onAction, currentRole }) {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [feedback, setFeedback] = useState('');

  const isReviewer = currentRole === 'Reviewer';

  const handleAction = (type) => {
    if (!isReviewer) return;

    if (type === 'approve') {
      setActionType(type);
      setShowModal(true);
    } else {
      onAction(type);
    }
  };

  const handleSubmit = () => {
    onAction(actionType, feedback);
    setShowModal(false);
    setFeedback('');
    setActionType('');
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
            size="small"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleAction('approve')}
            disabled={!isReviewer}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Approve</span>
          </Button>

          <Button
            variant="secondary"
            size="small"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleAction('request-changes')}
            disabled={!isReviewer}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Request Changes</span>
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Approve Document"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </>
        }
      >
        <div className="space-y-2">
          <label className="block">
            <span className="text-body-small font-medium text-text-high mb-1.5 block">
              Feedback (optional)
            </span>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Add any notes or feedback..."
              className="w-full px-3 py-2 border border-neutral-border rounded-md text-body-small focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary min-h-[80px] resize-none"
              maxLength={500}
            />
          </label>
          <div className="flex items-center justify-end">
            <span className="text-caption text-text-muted">
              {feedback.length}/500 characters
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
}
