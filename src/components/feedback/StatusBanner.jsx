export default function StatusBanner({ type = 'info', message, onClose }) {
  const types = {
    info: {
      bg: 'bg-brand-primary-light',
      text: 'text-brand-primary',
      icon: 'ℹ️',
    },
    success: {
      bg: 'bg-status-success-light',
      text: 'text-status-success-dark',
      icon: '✅',
    },
    warning: {
      bg: 'bg-status-warning-light',
      text: 'text-status-warning-dark',
      icon: '⚠️',
    },
    error: {
      bg: 'bg-status-error-light',
      text: 'text-status-error-dark',
      icon: '❌',
    },
  };

  const config = types[type];

  return (
    <div className={`${config.bg} ${config.text} px-6 py-4 rounded-lg flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{config.icon}</span>
        <span className="text-body-medium">{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="hover:opacity-70 transition-opacity">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
