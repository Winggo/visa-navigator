"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, hint, error, className = "", id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-content-secondary mb-1"
          >
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={4}
          className={`
            w-full px-4 py-2 border rounded-lg resize-y bg-surface-input text-content-primary
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

TextArea.displayName = "TextArea";

export { TextArea };
