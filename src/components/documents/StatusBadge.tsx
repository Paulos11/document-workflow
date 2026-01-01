import { STATUS_CONFIGS, type DocumentStatus } from '../../constants';

interface StatusBadgeProps {
  status: DocumentStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIGS[status];
  const { label, badge } = config;

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${badge.dotColor}`} />
      <span className={`text-body-medium ${badge.textColor}`}>
        {label}
      </span>
    </div>
  );
}
