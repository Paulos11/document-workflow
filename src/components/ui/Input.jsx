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
          px-3 py-2 text-body
          bg-neutral-surface
          border rounded
          focus:outline-none focus:ring-2 focus:ring-brand-primary
          disabled:bg-neutral-subtle disabled:cursor-not-allowed
          ${error ? 'border-status-error' : 'border-neutral-border'}
        `}
      />
      {error && <span className="text-caption text-status-error">{error}</span>}
    </div>
  );
}
