import { Card } from '../ui';

export default function MetadataDisplay({ document }) {
  return (
    <Card>
      <h3 className="text-h3 text-text-high mb-4">Document Metadata</h3>
      <div className="space-y-3">
        <div>
          <span className="text-caption text-text-muted block">Category</span>
          <span className="text-body text-text-high">{document.category}</span>
        </div>
        {document.metadata?.description && (
          <div>
            <span className="text-caption text-text-muted block">Description</span>
            <span className="text-body text-text-high">{document.metadata.description}</span>
          </div>
        )}
        <div>
          <span className="text-caption text-text-muted block">Reviewer</span>
          <span className="text-body text-text-high">{document.reviewer}</span>
        </div>
        <div>
          <span className="text-caption text-text-muted block">Uploaded By</span>
          <span className="text-body text-text-high">{document.uploadedBy}</span>
        </div>
        <div>
          <span className="text-caption text-text-muted block">Upload Date</span>
          <span className="text-body text-text-high">{document.uploadedDate}</span>
        </div>
      </div>
    </Card>
  );
}
