import { Card, Badge, Button } from '../ui';
import { FileText, Download } from 'lucide-react';

const formatFileSize = (bytes) => {
  if (!bytes) return 'Unknown';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function FilePreview({ files = [], uploadDate = "2 hours ago" }) {
  if (!files || files.length === 0) {
    return (
      <Card padding="none" className="border-l-4 border-l-brand-primary">
        <div className="p-4">
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-neutral-subtle rounded-full flex items-center justify-center mx-auto mb-2">
              <FileText className="w-6 h-6 text-text-muted" />
            </div>
            <p className="text-body-small text-text-muted">No files uploaded</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="none">
      <div className="p-4 border-b border-neutral-border">
        <h3 className="text-h3 text-text-high">Uploaded Files ({files.length})</h3>
      </div>
      <div className="p-4 space-y-3">
        {files.map((file, index) => {
          const fileExtension = file.name.split('.').pop().toUpperCase();

          return (
            <div
              key={file.id || index}
              className="flex items-center justify-between gap-3 p-3 bg-neutral-subtle/50 rounded-md hover:bg-neutral-subtle transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-brand-primary/5 rounded-md flex items-center justify-center flex-shrink-0 border border-brand-primary/10">
                  <FileText className="w-5 h-5 text-brand-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-body-small font-semibold text-text-high truncate">
                      {file.name}
                    </h4>
                    <Badge variant="blue" size="small">{fileExtension}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-caption text-text-muted">
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-body-small font-medium text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors whitespace-nowrap">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
