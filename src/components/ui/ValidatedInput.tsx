'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface ValidatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  hint?: string;
}

const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ label, error, touched, required, hint, className = '', ...props }, ref) => {
    const showError = touched && error;

    return (
      <div>
        <label className="block text-sm font-medium text-nearblack/70 mb-1.5">
          {label} {required && <span className="text-terracotta">*</span>}
        </label>
        <div className="relative">
          <input
            ref={ref}
            {...props}
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
              showError
                ? 'border-terracotta focus:border-terracotta focus:ring-2 focus:ring-terracotta/20'
                : 'border-cream focus:border-teal focus:ring-2 focus:ring-teal/20'
            } ${className}`}
          />
          {showError && (
            <ExclamationCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-terracotta" />
          )}
        </div>
        {showError && (
          <p className="mt-1 text-xs text-terracotta">{error}</p>
        )}
        {!showError && hint && (
          <p className="mt-1 text-xs text-nearblack/40">{hint}</p>
        )}
      </div>
    );
  }
);

ValidatedInput.displayName = 'ValidatedInput';

export default ValidatedInput;