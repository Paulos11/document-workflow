import React from 'react';

export function Textarea({ className, error, ...props }) {
    return (
        <textarea
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
        ${className || ''}
      `}
            {...props}
        />
    );
}
