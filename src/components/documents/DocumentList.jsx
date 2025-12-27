import DocumentCard from './DocumentCard';
import { EmptyState } from '../feedback';

export default function DocumentList({ documents, onDocumentClick }) {
  if (!documents || documents.length === 0) {
    return (
      <EmptyState
        icon="📂"
        title="No documents found"
        message="Upload your first document to get started with the review process."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onClick={() => onDocumentClick(doc)}
        />
      ))}
    </div>
  );
}
