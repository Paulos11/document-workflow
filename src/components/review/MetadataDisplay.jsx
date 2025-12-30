import { Card, MetadataField } from '../ui';
import { StatusBadge } from '../documents';
import { FileText, User } from 'lucide-react';

export default function MetadataDisplay({ document }) {
  return (
    <Card padding="none">
      {/* Header */}
      <div className="p-4 border-b border-neutral-border flex items-center gap-2">
        <FileText className="w-4 h-4 text-text-muted" />
        <h3 className="text-h3 text-text-high">Document Details</h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Document Info Section */}
        <div className="space-y-2">
          <h4 className="text-caption-caps text-text-muted">Document Information</h4>
          <div className="bg-neutral-subtle/50 rounded-md p-2.5 space-y-2.5">
            {document.metadata?.title && (
              <MetadataField label="Document Title" value={document.metadata.title} />
            )}
            <MetadataField label="Category" value={document.category} />
            <MetadataField label="Type" value={document.subcategory || 'N/A'} />
            {document.metadata?.description && (
              <MetadataField label="Description" value={document.metadata.description} />
            )}
          </div>
        </div>

        {/* Additional Metadata */}
        {document.metadata && Object.keys(document.metadata).length > 1 && (
          <div className="pt-3 border-t border-neutral-border space-y-2.5">
            {Object.entries(document.metadata)
              .filter(([key]) => key !== 'description' && key !== 'title')
              .map(([key, value]) => (
                <MetadataField
                  key={key}
                  label={key.replace(/([A-Z])/g, ' $1').trim()}
                  value={value?.toString() || '-'}
                />
              ))}
          </div>
        )}
      </div>
    </Card>
  );
}
