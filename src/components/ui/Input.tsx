import type { ChangeEvent } from 'react';

interface InputProps {
  id?: string;
  label?: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled,
  required,
  className = ''
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-body-medium text-text-medium">
          {label}
          {required && <span className="text-status-error ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          px-3 py-2.5 text-body
          bg-white
          border rounded-md
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/80
          disabled:bg-neutral-subtle disabled:cursor-not-allowed
          transition-all duration-200 ease-in-out
          ${error ? 'border-status-error focus:ring-status-error/20 focus:border-status-error' : 'border-neutral-border hover:border-neutral-border-strong'}
        `}
      />
      {error && <span className="text-caption text-status-error">{error}</span>}
    </div>
  );
}
