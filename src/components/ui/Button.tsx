import type { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error';
  size?: 'small' | 'medium' | 'large';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

export function Button({ children, variant = 'primary', size = 'medium', onClick, disabled, className = '' }: ButtonProps) {
  const baseStyles = 'rounded-md font-medium shadow-sm transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-1';

  const variants = {
    primary: 'bg-brand-primary hover:bg-brand-primary-hover text-white focus:ring-brand-primary',
    secondary: 'bg-neutral-surface hover:bg-neutral-surface-hover text-text-high border border-neutral-border focus:ring-neutral-border-strong',
    success: 'bg-status-success hover:bg-status-success-dark text-white focus:ring-status-success',
    error: 'bg-status-error hover:bg-status-error-dark text-white focus:ring-status-error',
  };

  const sizes = {
    small: 'px-3 py-1.5 text-button-small',
    medium: 'px-4 py-2 text-button',
    large: 'px-6 py-3 text-button',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
