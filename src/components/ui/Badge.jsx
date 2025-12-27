export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-neutral-subtle text-text-medium',
    success: 'bg-status-success-light text-status-success-dark',
    warning: 'bg-status-warning-light text-status-warning-dark',
    error: 'bg-status-error-light text-status-error-dark',
    orange: 'bg-status-orange-light text-status-orange-dark',
    purple: 'bg-status-purple-light text-status-purple-dark',
  };

  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-0.5
        rounded
        text-caption-caps
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
