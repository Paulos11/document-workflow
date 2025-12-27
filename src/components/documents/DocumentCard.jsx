import { Card } from '../ui';
import StatusBadge from './StatusBadge';

export default function DocumentCard({ document, onClick }) {
  return (
    <Card hover onClick={onClick}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-h3 text-text-high mb-1">{document.name}</h3>
          <p className="text-caption text-text-low">{document.category}</p>
        </div>
        <StatusBadge status={document.status} />
      </div>
      <div className="grid grid-cols-2 gap-4 text-caption text-text-muted">
        <div>
          <span className="block">Uploaded by</span>
          <span className="text-text-medium">{document.uploadedBy}</span>
        </div>
        <div>
          <span className="block">Date</span>
          <span className="text-text-medium">{document.uploadedDate}</span>
        </div>
      </div>
      {document.reviewer && (
        <div className="mt-3 pt-3 border-t border-neutral-border">
          <span className="text-caption text-text-muted">Reviewer: </span>
          <span className="text-caption text-text-medium">{document.reviewer}</span>
        </div>
      )}
    </Card>
  );
}
