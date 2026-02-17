"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-content-secondary mb-1"
          >
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-2 border rounded-lg bg-surface-input text-content-primary
            focus:outline-none focus:ring-2 focus:ring-[#D97757] focus:border-transparent
            disabled:bg-surface-disabled disabled:cursor-not-allowed
            ${error ? "border-red-500" : "border-border-secondary"}
            ${className}
          `}
          {...props}
        />
        {hint && !error && (
          <p className="mt-1 text-sm text-content-muted">{hint}</p>
        )}
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
