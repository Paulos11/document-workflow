import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'orange' | 'purple';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
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
        px-2 py-0.5
        rounded-[1px]
        border border-transparent
        text-[10px] leading-3 uppercase tracking-wider font-bold
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
