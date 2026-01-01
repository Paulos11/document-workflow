import { Upload, Eye, CheckCircle, XCircle, AlertCircle, MessageSquare, RefreshCw } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { formatRelativeTime } from '../../utils/dateFormatters';
import type { DocumentActivity } from '../../types/app';

interface TimelineItemProps {
  activity: DocumentActivity;
  isLast: boolean;
}

interface ActivityConfig {
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  borderColor: string;
}

export default function TimelineItem({ activity, isLast }: TimelineItemProps) {
  const getActivityConfig = (type: string): ActivityConfig => {
    const configs: Record<string, ActivityConfig> = {
      upload: {
        icon: Upload,
        bgColor: 'bg-brand-primary/10',
        iconColor: 'text-brand-primary',
        borderColor: 'border-brand-primary/20'
      },
      review: {
        icon: Eye,
        bgColor: 'bg-brand-primary/10',
        iconColor: 'text-brand-primary',
        borderColor: 'border-brand-primary/20'
      },
      approved: {
        icon: CheckCircle,
        bgColor: 'bg-status-success/10',
        iconColor: 'text-status-success',
        borderColor: 'border-status-success/30'
      },
      rejected: {
        icon: XCircle,
        bgColor: 'bg-status-error/10',
        iconColor: 'text-status-error',
        borderColor: 'border-status-error/30'
      },
      'changes-requested': {
        icon: AlertCircle,
        bgColor: 'bg-status-orange/10',
        iconColor: 'text-status-orange',
        borderColor: 'border-status-orange/30'
      },
      comment: {
        icon: MessageSquare,
        bgColor: 'bg-brand-primary/10',
        iconColor: 'text-brand-primary',
        borderColor: 'border-brand-primary/20'
      },
      resubmit: {
        icon: RefreshCw,
        bgColor: 'bg-status-purple/10',
        iconColor: 'text-status-purple',
        borderColor: 'border-status-purple/30'
      }
    };
    return configs[type] || configs.upload;
  };

  const config = getActivityConfig(activity.type);
  const Icon = config.icon;

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 shadow-small ${config.bgColor} ${config.borderColor}`}>
          <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />
        </div>
        {!isLast && <div className="w-0.5 bg-neutral-border flex-1 mt-1.5 rounded-full" />}
      </div>
      <div className="flex-1 pb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-body-small font-semibold text-text-high">
            {activity.action}
          </span>
          <span className="text-caption text-text-muted">
            {formatRelativeTime(activity.timestamp)}
          </span>
        </div>
        {activity.description && (
          <p className="text-body-small text-text-medium mb-1">{activity.description}</p>
        )}
        <p className="text-caption text-text-muted">by {activity.user}</p>
      </div>
    </div>
  );
}
