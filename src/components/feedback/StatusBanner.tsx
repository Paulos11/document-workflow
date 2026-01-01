import { X } from 'lucide-react';
import { useEffect } from 'react';
import { STATUS_CONFIGS, type DocumentStatus } from '../../constants';

interface StatusBannerProps {
  status: DocumentStatus;
  onDismiss?: () => void;
  autoHide?: boolean;
  autoHideDuration?: number;
}

export default function StatusBanner({ status, onDismiss, autoHide = false, autoHideDuration = 5000 }: StatusBannerProps) {
  const config = STATUS_CONFIGS[status];
  const { banner } = config;
  const Icon = banner.icon;

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
      className={`flex items-center gap-2 sm:gap-3 px-3 py-3 pb-4 sm:px-4 sm:py-3 sm:pb-4 rounded-lg border mb-6 ${banner.bgColor} ${banner.borderColor}`}
      role="alert"
      aria-live="polite"
    >
      <div className={`flex-shrink-0 ${banner.iconColor}`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-xs sm:text-body-small font-medium ${banner.textColor} break-words`}>
          {banner.message}
        </p>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`flex-shrink-0 ${banner.iconColor} hover:opacity-70 transition-opacity p-1`}
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      )}
    </div>
  );
}
