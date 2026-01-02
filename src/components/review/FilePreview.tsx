import { Card, Badge, Button } from '../ui';
import { FileText, Download, Eye, Upload, X, Edit3 } from 'lucide-react';
import type { DocumentFile } from '../../types/app';
import { useState } from 'react';

const formatFileSize = (bytes: number): string => {
  if (!bytes) return 'Unknown';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

interface FilePreviewProps {
  files?: DocumentFile[];
  editable?: boolean;
  onFilesChange?: (files: DocumentFile[]) => void;
}

export default function FilePreview({ files = [], editable = false, onFilesChange }: FilePreviewProps) {
  const [previewFile, setPreviewFile] = useState<DocumentFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDownload = (file: DocumentFile) => {
    const blob = new Blob([`Content for ${file.name}`], { type: file.type });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePreview = (file: DocumentFile) => {
    setPreviewFile(file);
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const addFiles = (selectedFiles: File[]) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];

    const validFiles = selectedFiles.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum file size is 10MB.`);
        return false;
      }
      if (!validTypes.includes(file.type)) {
        alert(`${file.name} is not a supported file type.`);
        return false;
      }
      return true;
    });

    const newFiles: DocumentFile[] = validFiles.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type
    }));

    if (onFilesChange) {
      onFilesChange([...files, ...newFiles]);
    }
  };

  const removeFile = (fileId: string) => {
    if (onFilesChange) {
      onFilesChange(files.filter(f => f.id !== fileId));
    }
  };

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
    <>
      <Card padding="none">
        <div className="p-4 border-b border-neutral-border flex items-center gap-2">
          <h3 className="text-h3 text-text-high">Uploaded Files ({files.length})</h3>
          {editable && (
            <div className="ml-auto flex items-center gap-1.5 px-2 py-1 bg-orange-50 border border-orange-200 rounded-md">
              <Edit3 className="w-3 h-3 text-orange-600" />
              <span className="text-caption text-orange-700 font-medium">Editing</span>
            </div>
          )}
        </div>
        <div className="p-4 space-y-3">
          {editable && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${
                isDragging
                  ? 'border-brand-primary bg-brand-primary/5'
                  : 'border-neutral-border hover:border-brand-primary/50'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <label htmlFor="file-upload-edit" className="text-body-small font-medium text-brand-primary cursor-pointer hover:underline">
                    Choose files
                  </label>
                  <span className="text-body-small text-text-muted"> or drag and drop</span>
                  <input
                    id="file-upload-edit"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Upload files"
                  />
                </div>
                <p className="text-caption text-text-muted">PDF, DOCX, JPG, PNG (max 10MB each)</p>
              </div>
            </div>
          )}

          {files.map((file, index) => {
            const fileExtension = file.name.split('.').pop()?.toUpperCase() || 'FILE';
            const isPDF = file.type === 'application/pdf';

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
                      <Badge variant="default">{fileExtension}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-caption text-text-muted">
                      <span>{formatFileSize(file.size)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {editable && (
                    <button
                      onClick={() => removeFile(file.id || '')}
                      className="flex items-center gap-1.5 px-2 py-1.5 text-body-small font-medium text-status-error hover:bg-status-error-light rounded-md transition-colors"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {!editable && isPDF && (
                    <button
                      onClick={() => handlePreview(file)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-body-small font-medium text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors whitespace-nowrap"
                      aria-label={`Preview ${file.name}`}
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                  )}
                  {!editable && (
                    <button
                      onClick={() => handleDownload(file)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-body-small font-medium text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors whitespace-nowrap"
                      aria-label={`Download ${file.name}`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {previewFile && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={closePreview}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-border">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-brand-primary" />
                <div>
                  <h3 className="text-h3 text-text-high">{previewFile.name}</h3>
                  <p className="text-caption text-text-muted">
                    {formatFileSize(previewFile.size)} • {previewFile.type}
                  </p>
                </div>
              </div>
              <button
                onClick={closePreview}
                className="text-text-muted hover:text-text-high transition-colors p-2"
                aria-label="Close preview"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-neutral-subtle/30">
              {previewFile.type === 'application/pdf' ? (
                <div className="h-full flex flex-col p-6">
                  <div className="bg-white rounded-lg shadow-lg h-full min-h-[600px] overflow-hidden">
                    {/* PDF Preview - Using preview.pdf from public folder */}
                    <iframe
                      src="/preview.pdf"
                      className="w-full h-full border-0"
                      title={`Preview of ${previewFile.name}`}
                      style={{ minHeight: '600px' }}
                    />

                      {/* Alternative: Show document info if iframe doesn't load */}
                      <div className="hidden" id="pdf-fallback">
                        <div className="text-center py-12 px-6">
                          <FileText className="w-16 h-16 text-brand-primary mx-auto mb-4" />
                          <h4 className="text-lg font-semibold text-text-high mb-2">PDF Document</h4>
                          <p className="text-body text-text-muted mb-6">
                            {previewFile.name}
                          </p>
                          <div className="bg-neutral-subtle/50 rounded-md p-6 text-left mb-6 max-w-md mx-auto">
                            <p className="text-body-small text-text-medium mb-3">
                              Document Information
                            </p>
                            <ul className="text-body-small text-text-low space-y-2">
                              <li>• File name: {previewFile.name}</li>
                              <li>• File size: {formatFileSize(previewFile.size)}</li>
                              <li>• File type: {previewFile.type}</li>
                            </ul>
                            <p className="text-caption text-text-muted mt-4">
                              Note: This is a demo preview. In production, actual uploaded PDFs would be displayed here.
                            </p>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-text-muted mx-auto mb-4" />
                  <p className="text-body text-text-muted">
                    Preview not available for this file type
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
