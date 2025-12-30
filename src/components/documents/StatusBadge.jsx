export default function StatusBadge({ status }) {
  const statusConfig = {
    'Draft': {
      color: 'text-text-medium',
      dotColor: 'bg-neutral-border-strong',
      label: 'Draft'
    },
    'Submitted': {
      color: 'text-status-warning-dark',
      dotColor: 'bg-status-warning',
      label: 'Submitted'
    },
    'In Review': {
      color: 'text-status-orange-dark',
      dotColor: 'bg-status-orange',
      label: 'In Review'
    },
    'Changes Requested': {
      color: 'text-status-error-dark',
      dotColor: 'bg-status-error',
      label: 'Changes Requested'
    },
    'Resubmitted': {
      color: 'text-status-purple-dark',
      dotColor: 'bg-status-purple',
      label: 'Resubmitted'
    },
    'Approved': {
      color: 'text-status-success-dark',
      dotColor: 'bg-status-success',
      label: 'Approved'
    },
  };

  const config = statusConfig[status] || statusConfig['Submitted'];

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />
      <span className={`text-body-medium ${config.color}`}>
        {config.label}
      </span>
    </div>
  );
}
