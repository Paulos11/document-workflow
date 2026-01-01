import type { ReactNode, LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children: ReactNode;
}

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={`text-body-small font-medium text-text-high block mb-1 ${className || ''}`}
      {...props}
    >
      {children}
    </label>
  );
}
