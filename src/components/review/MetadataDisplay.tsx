import { Card, MetadataField, Input, Textarea, Label } from '../ui';
import { FileText, Edit3 } from 'lucide-react';
import type { AppDocument } from '../../types/app';

interface MetadataDisplayProps {
  document: AppDocument;
  editable?: boolean;
  onChange?: (field: string, value: string) => void;
}

export default function MetadataDisplay({ document, editable = false, onChange }: MetadataDisplayProps) {
  const formatLabel = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleChange = (field: string, value: string) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <Card padding="none">
      <div className="p-4 border-b border-neutral-border flex items-center gap-2">
        <FileText className="w-4 h-4 text-text-muted" />
        <h3 className="text-h3 text-text-high">Document Details</h3>
        {editable && (
          <div className="ml-auto flex items-center gap-1.5 px-2 py-1 bg-orange-50 border border-orange-200 rounded-md">
            <Edit3 className="w-3 h-3 text-orange-600" />
            <span className="text-caption text-orange-700 font-medium">Editing</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h4 className="text-caption-caps text-text-muted">Document Information</h4>
          <div className="bg-neutral-subtle/50 rounded-md p-2.5 space-y-2.5">
            {editable ? (
              <div>
                <Label htmlFor="metadata-title">Document Title</Label>
                <Input
                  id="metadata-title"
                  value={document.metadata?.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter document title"
                />
              </div>
            ) : (
              document.metadata?.title && (
                <MetadataField label="Document Title" value={document.metadata.title} />
              )
            )}

            {/* Category - Read only */}
            <MetadataField label="Category" value={document.category} />

            {/* Type - Read only */}
            <MetadataField label="Type" value={document.subcategory || 'N/A'} />

            {/* Description */}
            {editable ? (
              <div>
                <Label htmlFor="metadata-description">Description</Label>
                <Textarea
                  id="metadata-description"
                  value={document.metadata?.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
            ) : (
              document.metadata?.description && (
                <MetadataField label="Description" value={document.metadata.description} />
              )
            )}
          </div>
        </div>

        {/* Additional Metadata */}
        {document.metadata && Object.keys(document.metadata).length > 1 && (
          <div className="pt-3 border-t border-neutral-border space-y-2.5">
            {Object.entries(document.metadata)
              .filter(([key]) => key !== 'description' && key !== 'title')
              .map(([key, value]) => (
                editable ? (
                  <div key={key}>
                    <Label htmlFor={`metadata-${key}`}>{formatLabel(key)}</Label>
                    <Input
                      id={`metadata-${key}`}
                      type={key.toLowerCase().includes('date') ? 'date' : 'text'}
                      value={value?.toString() || ''}
                      onChange={(e) => handleChange(key, e.target.value)}
                      placeholder={`Enter ${formatLabel(key).toLowerCase()}`}
                    />
                  </div>
                ) : (
                  <MetadataField
                    key={key}
                    label={formatLabel(key)}
                    value={value?.toString() || '-'}
                  />
                )
              ))}
          </div>
        )}
      </div>
    </Card>
  );
}
