import { useState } from 'react';
import DropZone from './DropZone';
import FileList from './FileList';
import MetadataForm from './MetadataForm';
import StepIndicator from './StepIndicator';
import { Button } from '../ui';

export default function FileUpload({ onUploadComplete }) {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [metadata, setMetadata] = useState({
    category: '',
    description: '',
    reviewer: '',
  });

  const handleFilesSelected = (selectedFiles) => {
    setFiles(selectedFiles);
    setStep(2);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleMetadataChange = (field, value) => {
    setMetadata({ ...metadata, [field]: value });
  };

  const handleSubmit = () => {
    const uploadData = {
      files,
      metadata,
      uploadedDate: new Date().toISOString(),
      uploadedBy: 'John Doe',
      status: 'Pending Review',
    };
    onUploadComplete(uploadData);
    setFiles([]);
    setMetadata({ category: '', description: '', reviewer: '' });
    setStep(1);
  };

  const canSubmit = files.length > 0 && metadata.category && metadata.reviewer;

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator currentStep={step} />

      {step === 1 && (
        <div className="mt-8">
          <DropZone onFilesSelected={handleFilesSelected} />
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 space-y-6">
          <FileList files={files} onRemoveFile={handleRemoveFile} />
          <MetadataForm metadata={metadata} onChange={handleMetadataChange} />
          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={!canSubmit}>
              Upload Document
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
