import type { ReactNode } from 'react';

interface MetadataFieldProps {
  label: string;
  value?: string | number;
  icon?: ReactNode;
}

export function MetadataField({ label, value, icon }: MetadataFieldProps) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-text-muted">{icon}</span>}
        <span className="text-caption text-text-muted font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="text-body-small text-text-high font-medium">
        {value || '-'}
      </p>
    </div>
  );
}
