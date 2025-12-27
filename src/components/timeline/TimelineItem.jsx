export default function TimelineItem({ activity, isLast }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getActivityIcon = (type) => {
    const icons = {
      upload: '📤',
      review: '👁️',
      approved: '✅',
      rejected: '❌',
      'changes-requested': '📝',
      comment: '💬',
      resubmit: '🔄',
    };
    return icons[type] || '•';
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 bg-brand-primary-light rounded-full flex items-center justify-center text-lg flex-shrink-0">
          {getActivityIcon(activity.type)}
        </div>
        {!isLast && <div className="w-0.5 bg-neutral-border flex-1 mt-2" />}
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between mb-1">
          <span className="text-body-medium text-text-high">{activity.action}</span>
          <span className="text-caption text-text-muted">{formatDate(activity.timestamp)}</span>
        </div>
        <p className="text-body text-text-low mb-1">{activity.description}</p>
        <p className="text-caption text-text-muted">by {activity.user}</p>
      </div>
    </div>
  );
}
