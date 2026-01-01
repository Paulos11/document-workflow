type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type = 'info', isVisible, onClose }: ToastProps) {
  if (!isVisible) return null;

  const types: Record<ToastType, string> = {
    success: 'bg-status-success text-white',
    error: 'bg-status-error text-white',
    warning: 'bg-status-warning text-white',
    info: 'bg-brand-primary text-white',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`${types[type]} px-6 py-4 rounded-sm shadow-large flex items-center gap-3 min-w-[300px]`}>
        <span className="text-body flex-1">{message}</span>
        <button onClick={onClose} className="hover:opacity-70 transition-opacity">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
