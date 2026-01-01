import type { AppDocument } from '../../types/app';
import { STATUS_CONFIGS, type DocumentStatus } from '../../constants';

interface StatusSummaryProps {
  documents: AppDocument[];
}

export default function StatusSummary({ documents }: StatusSummaryProps) {
  const statusCounts = documents.reduce((acc, doc) => {
    acc[doc.status] = (acc[doc.status] || 0) + 1;
    return acc;
  }, {} as Record<DocumentStatus, number>);

  const statusKeys: DocumentStatus[] = ['Draft', 'Submitted', 'In Review', 'Changes Requested', 'Resubmitted', 'Approved'];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statusKeys.map((key) => {
        const config = STATUS_CONFIGS[key];
        const { summary } = config;

        return (
          <div key={key} className={`${summary.bgColor} rounded-sm p-4`}>
            <div className={`text-h1 ${summary.textColor} mb-1`}>{statusCounts[key] || 0}</div>
            <div className="text-caption text-text-medium">{key}</div>
          </div>
        );
      })}
    </div>
  );
}
