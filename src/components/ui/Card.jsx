export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`
        bg-neutral-surface
        border border-neutral-border
        rounded-lg
        shadow-medium
        p-6
        ${hover ? 'hover:bg-neutral-surface-hover hover:border-neutral-border-strong transition-colors cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
