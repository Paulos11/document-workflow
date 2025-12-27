import { useState } from 'react';
import { Card, Button, Input, Modal } from '../ui';

export default function ReviewActions({ onAction }) {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleAction = (type) => {
    if (type === 'approve' || type === 'reject') {
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
      <Card>
        <h3 className="text-h3 text-text-high mb-4">Review Actions</h3>
        <div className="space-y-3">
          <Button
            variant="success"
            className="w-full"
            onClick={() => handleAction('approve')}
          >
            ✓ Approve
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => handleAction('request-changes')}
          >
            📝 Request Changes
          </Button>
          <Button
            variant="error"
            className="w-full"
            onClick={() => handleAction('reject')}
          >
            ✕ Reject
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={actionType === 'approve' ? 'Approve Document' : 'Reject Document'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant={actionType === 'approve' ? 'success' : 'error'}
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </>
        }
      >
        <Input
          label="Feedback (optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Add any notes or feedback..."
        />
      </Modal>
    </>
  );
}
