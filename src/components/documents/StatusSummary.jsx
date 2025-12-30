export default function StatusSummary({ documents }) {
  const statusCounts = documents.reduce((acc, doc) => {
    acc[doc.status] = (acc[doc.status] || 0) + 1;
    return acc;
  }, {});

  const statuses = [
    { key: 'Draft', color: 'text-text-medium', bg: 'bg-neutral-subtle' },
    { key: 'Submitted', color: 'text-status-warning', bg: 'bg-status-warning-light' },
    { key: 'In Review', color: 'text-status-orange', bg: 'bg-status-orange-light' },
    { key: 'Changes Requested', color: 'text-status-error', bg: 'bg-status-error-light' },
    { key: 'Resubmitted', color: 'text-status-purple', bg: 'bg-status-purple-light' },
    { key: 'Approved', color: 'text-status-success', bg: 'bg-status-success-light' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statuses.map(({ key, color, bg }) => (
        <div key={key} className={`${bg} rounded-sm p-4`}>
          <div className={`text-h1 ${color} mb-1`}>{statusCounts[key] || 0}</div>
          <div className="text-caption text-text-medium">{key}</div>
        </div>
      ))}
    </div>
  );
}
