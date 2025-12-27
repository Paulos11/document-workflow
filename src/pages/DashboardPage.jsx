import { DocumentList, StatusSummary } from '../components/documents';

export default function DashboardPage({ documents, onDocumentClick }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h2 text-text-high mb-2">Dashboard</h2>
        <p className="text-body text-text-low">Overview of all documents and their status</p>
      </div>

      <StatusSummary documents={documents} />

      <div>
        <h3 className="text-h3 text-text-high mb-4">All Documents</h3>
        <DocumentList documents={documents} onDocumentClick={onDocumentClick} />
      </div>
    </div>
  );
}
