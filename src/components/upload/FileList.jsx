import { Card } from '../ui';

export default function FileList({ files, onRemoveFile }) {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Card>
      <h3 className="text-h3 text-text-high mb-4">Selected Files</h3>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-neutral-subtle rounded border border-neutral-border"
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">📄</span>
              <div className="flex-1 min-w-0">
                <p className="text-body text-text-medium truncate">{file.name}</p>
                <p className="text-caption text-text-muted">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={() => onRemoveFile(index)}
              className="text-status-error hover:text-status-error-dark transition-colors p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
