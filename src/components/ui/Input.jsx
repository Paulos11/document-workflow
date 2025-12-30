export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled,
  required,
  className = ''
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-body-medium text-text-medium">
          {label}
          {required && <span className="text-status-error ml-1">*</span>}
        </label>
      )}
      <input
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
