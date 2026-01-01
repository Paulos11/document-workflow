import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  id?: string;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export function Textarea({
  id,
  label,
  error,
  required,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-body-medium text-text-medium">
          {label}
          {required && <span className="text-status-error ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        required={required}
        className={`
          w-full px-3 py-2.5
          text-body bg-white
          border rounded-md
          focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/80
          placeholder:text-text-muted
          disabled:bg-neutral-subtle disabled:cursor-not-allowed
          shadow-sm
          transition-all duration-200 ease-in-out
          ${error ? 'border-status-error focus:ring-status-error/20 focus:border-status-error' : 'border-neutral-border hover:border-neutral-border-strong'}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-caption text-status-error">{error}</span>}
    </div>
  );
}
