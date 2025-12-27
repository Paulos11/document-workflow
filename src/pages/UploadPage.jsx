import { FileUpload } from '../components/upload';
import { StatusBanner } from '../components/feedback';

export default function UploadPage({ onUploadComplete, showSuccessBanner, onCloseBanner }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h2 text-text-high mb-2">Upload Document</h2>
        <p className="text-body text-text-low">Upload a new document for review and approval</p>
      </div>

      {showSuccessBanner && (
        <StatusBanner
          type="success"
          message="Document uploaded successfully!"
          onClose={onCloseBanner}
        />
      )}

      <FileUpload onUploadComplete={onUploadComplete} />
    </div>
  );
}
