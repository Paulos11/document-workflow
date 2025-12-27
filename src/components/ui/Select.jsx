export default function Select({
  label,
  value,
  onChange,
  options,
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
      <select
        value={value}
        onChange={onChange}
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
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-caption text-status-error">{error}</span>}
    </div>
  );
}
