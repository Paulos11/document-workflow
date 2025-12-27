import { useState } from 'react';
import {
  ReviewHeader,
  FilePreview,
  MetadataDisplay,
  CommentsSection,
  ReviewActions,
} from '../components/review';
import { ActivityTimeline } from '../components/timeline';

export default function ReviewPage({ document, onAction }) {
  const [comments, setComments] = useState(document?.comments || []);

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  const handleReviewAction = (actionType, feedback) => {
    onAction(actionType, feedback);
  };

  if (!document) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-h2 text-text-high mb-2">No Document Selected</h2>
          <p className="text-body text-text-low">
            Select a document from the dashboard to review
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ReviewHeader document={document} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FilePreview fileName={document.name} />
          <CommentsSection comments={comments} onAddComment={handleAddComment} />
        </div>

        <div className="space-y-6">
          <MetadataDisplay document={document} />
          <ReviewActions onAction={handleReviewAction} />
          {document.activities && <ActivityTimeline activities={document.activities} />}
        </div>
      </div>
    </div>
  );
}
