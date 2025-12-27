import { useState } from 'react';

export default function DropZone({ onFilesSelected }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    onFilesSelected(files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-lg p-12 text-center transition-colors
        ${isDragging
          ? 'border-brand-primary bg-brand-primary-light'
          : 'border-neutral-border hover:border-neutral-border-strong hover:bg-neutral-subtle'
        }
      `}
    >
      <div className="text-6xl mb-4">📤</div>
      <h3 className="text-h3 text-text-high mb-2">Drop files here</h3>
      <p className="text-body text-text-low mb-6">or click to browse</p>
      <label className="inline-block">
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx"
        />
        <span className="bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-2 rounded text-button cursor-pointer transition-colors inline-block">
          Browse Files
        </span>
      </label>
      <p className="text-caption text-text-muted mt-4">
        Supported formats: PDF, DOC, DOCX, XLS, XLSX
      </p>
    </div>
  );
}
