import { StatusBadge } from '../documents';

export default function ReviewHeader({ document }) {
  return (
    <div className="bg-neutral-surface border-b border-neutral-border p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-h1 text-text-high mb-2">{document.name}</h1>
            <div className="flex items-center gap-6 text-body text-text-low">
              <div>
                <span className="text-text-muted">Category: </span>
                <span className="text-text-medium">{document.category}</span>
              </div>
              <div>
                <span className="text-text-muted">Uploaded by: </span>
                <span className="text-text-medium">{document.uploadedBy}</span>
              </div>
              <div>
                <span className="text-text-muted">Date: </span>
                <span className="text-text-medium">{document.uploadedDate}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={document.status} />
        </div>
      </div>
    </div>
  );
}
