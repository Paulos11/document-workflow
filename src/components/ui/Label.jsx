import React from 'react';

export function Label({ className, children, ...props }) {
    return (
        <label
            className={`text-body-small font-medium text-text-high block mb-1 ${className || ''}`}
            {...props}
        >
            {children}
        </label>
    );
}
