import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'small' | 'default' | 'large';
  noBorder?: boolean;
  noShadow?: boolean;
}

export function Card({
  children,
  className = '',
  hover = false,
  padding = 'default',
  noBorder = false,
  noShadow = false
}: CardProps) {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    default: 'p-5',
    large: 'p-6'
  };

  return (
    <div
      className={`
        bg-white
        rounded-lg
        ${!noBorder ? 'border border-neutral-border' : ''}
        ${!noShadow ? 'shadow-small' : ''}
        ${hover ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer' : ''}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
