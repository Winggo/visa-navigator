"use client";

import { KeyboardEvent, useRef, useEffect } from "react";

interface TextQuestionProps {
  value: string | null;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  multiline?: boolean;
}

export function TextQuestion({
  value,
  onChange,
  onSubmit,
  placeholder,
  multiline = false,
}: TextQuestionProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-focus on mount
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !multiline) {
      e.preventDefault();
      onSubmit();
    }
    if (e.key === "Enter" && e.metaKey && multiline) {
      e.preventDefault();
      onSubmit();
    }
  };

  const baseClassName = `
    w-full bg-transparent border-b-2 border-gray-300
    focus:border-blue-600 focus:outline-none
    text-2xl md:text-3xl font-light text-gray-900
    placeholder:text-gray-400
    transition-colors duration-200
    py-2
  `;

  if (multiline) {
    return (
      <div>
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={3}
          className={`${baseClassName} resize-none`}
        />
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={onSubmit}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            OK
            <span className="text-blue-200 text-sm">
              press Cmd + Enter
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={baseClassName}
      />
      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={onSubmit}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          OK
          <span className="text-blue-200 text-sm flex items-center gap-1">
            press Enter <span className="text-lg">↵</span>
          </span>
        </button>
      </div>
    </div>
  );
}
