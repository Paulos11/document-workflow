import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
  action?: ReactNode;
}

export default function EmptyState({ icon = '📄', title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-h3 text-text-high mb-2">{title}</h3>
      <p className="text-body text-text-low mb-6 max-w-md">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
