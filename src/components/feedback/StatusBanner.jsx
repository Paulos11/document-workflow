import { X, CheckCircle, AlertCircle, Info, Clock, FileText } from 'lucide-react';
import { useEffect } from 'react';

const getBannerConfig = (status) => {
  const configs = {
    'Draft': {
      icon: FileText,
      bgColor: 'bg-neutral-subtle',
      borderColor: 'border-neutral-border-strong',
      iconColor: 'text-text-medium',
      textColor: 'text-text-high',
      message: 'Your document has been saved as a draft.'
    },
    'Submitted': {
      icon: Clock,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
      message: 'Your document has been submitted for review.'
    },
    'In Review': {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
      message: 'Your document is currently under review.'
    },
    'Changes Requested': {
      icon: AlertCircle,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconColor: 'text-orange-600',
      textColor: 'text-orange-900',
      message: 'Reviewer requested changes to your document.'
    },
    'Resubmitted': {
      icon: Clock,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
      message: 'Your document has been resubmitted for review.'
    },
    'Approved': {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
      message: 'Your document has been approved.'
    }
  };

  return configs[status] || configs['Submitted'];
};

export default function StatusBanner({ status, onDismiss, autoHide = false, autoHideDuration = 5000 }) {
  const config = getBannerConfig(status);
  const Icon = config.icon;

  useEffect(() => {
    if (autoHide && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDuration, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={`${config.bgColor} ${config.borderColor} border-l-4 p-4 mb-6 rounded-md shadow-sm animate-fade-in`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} aria-hidden="true" />
          <div className="flex-1">
            <p className={`text-body-small font-medium ${config.textColor}`}>
              {config.message}
            </p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`${config.iconColor} hover:${config.iconColor}/80 transition-colors flex-shrink-0 rounded-md p-1 hover:bg-black/5`}
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
