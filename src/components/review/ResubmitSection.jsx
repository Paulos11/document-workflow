import { useState } from 'react';
import { Card, Button } from '../ui';
import { Upload, FileText, X } from 'lucide-react';

export default function ResubmitSection({ onResubmit, currentFiles = [] }) {
  const [newFiles, setNewFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    addFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const addFiles = (files) => {
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      return validTypes.includes(file.type);
    });

    const fileObjects = validFiles.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));

    setNewFiles([...newFiles, ...fileObjects]);
  };

  const removeFile = (fileId) => {
    setNewFiles(newFiles.filter(f => f.id !== fileId));
  };

  const handleSubmit = () => {
    if (newFiles.length > 0) {
      onResubmit(newFiles);
      setNewFiles([]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Card padding="none">
      <div className="p-4 border-b border-neutral-border bg-orange-50">
        <h3 className="text-h3 text-orange-900 font-semibold">Update & Resubmit</h3>
        <p className="text-caption text-orange-700 mt-1">
          Upload updated files to address the reviewer's feedback
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Files Info */}
        <div className="bg-neutral-subtle/50 rounded-md p-3">
          <p className="text-caption text-text-muted mb-1">Current files: {currentFiles.length}</p>
          <p className="text-caption text-text-low">New files will replace the existing ones</p>
        </div>

        {/* Upload Area */}
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
              <label htmlFor="file-upload" className="text-body-small font-medium text-brand-primary cursor-pointer hover:underline">
                Choose files
              </label>
              <span className="text-body-small text-text-muted"> or drag and drop</span>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <p className="text-caption text-text-muted">PDF, DOCX, JPG, PNG (max 10MB each)</p>
          </div>
        </div>

        {/* New Files List */}
        {newFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-caption-caps text-text-muted">New Files ({newFiles.length})</p>
            {newFiles.map(file => (
              <div
                key={file.id}
                className="flex items-center justify-between gap-3 p-3 bg-green-50 border border-green-200 rounded-md"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-body-small font-medium text-text-high truncate">{file.name}</p>
                    <p className="text-caption text-text-muted">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-text-muted hover:text-status-error transition-colors p-1"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={newFiles.length === 0}
          className="w-full flex items-center justify-center gap-2"
          variant="primary"
        >
          <Upload className="w-4 h-4 flex-shrink-0" />
          <span className="whitespace-nowrap">
            Resubmit Document {newFiles.length > 0 && `(${newFiles.length} file${newFiles.length !== 1 ? 's' : ''})`}
          </span>
        </Button>
      </div>
    </Card>
  );
}
