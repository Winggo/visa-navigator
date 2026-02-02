"use client";

import { useEffect, useRef, KeyboardEvent } from "react";

interface YesNoQuestionProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
  onSubmit: () => void;
  followUpValue?: string | null;
  onFollowUpChange?: (value: string) => void;
  followUpPlaceholder?: string;
}

export function YesNoQuestion({
  value,
  onChange,
  onSubmit,
  followUpValue,
  onFollowUpChange,
  followUpPlaceholder,
}: YesNoQuestionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Focus textarea when yes is selected
    if (value === true && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "y" || e.key === "Y") {
      e.preventDefault();
      onChange(true);
    } else if (e.key === "n" || e.key === "N") {
      e.preventDefault();
      onChange(false);
      // Auto-submit on No if no follow-up needed
      setTimeout(() => onSubmit(), 100);
    }
  };

  const handleTextareaKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && e.metaKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div onKeyDown={value === null ? handleKeyDown : undefined} tabIndex={0}>
      <div className="flex gap-3">
        <button
          onClick={() => onChange(true)}
          className={`
            px-8 py-4 rounded-lg border-2 font-medium text-lg transition-all
            ${
              value === true
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }
          `}
        >
          <span className="flex items-center gap-2">
            <span
              className={`
              w-6 h-6 rounded border-2 flex items-center justify-center text-sm font-bold
              ${value === true ? "border-blue-600 bg-blue-600 text-white" : "border-gray-400"}
            `}
            >
              Y
            </span>
            Yes
          </span>
        </button>
        <button
          onClick={() => {
            onChange(false);
            setTimeout(() => onSubmit(), 100);
          }}
          className={`
            px-8 py-4 rounded-lg border-2 font-medium text-lg transition-all
            ${
              value === false
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }
          `}
        >
          <span className="flex items-center gap-2">
            <span
              className={`
              w-6 h-6 rounded border-2 flex items-center justify-center text-sm font-bold
              ${value === false ? "border-blue-600 bg-blue-600 text-white" : "border-gray-400"}
            `}
            >
              N
            </span>
            No
          </span>
        </button>
      </div>

      {/* Follow-up textarea when Yes is selected */}
      {value === true && onFollowUpChange && (
        <div className="mt-6 animate-fade-in">
          <textarea
            ref={textareaRef}
            value={followUpValue || ""}
            onChange={(e) => onFollowUpChange(e.target.value)}
            onKeyDown={handleTextareaKeyDown}
            placeholder={followUpPlaceholder}
            rows={3}
            className={`
              w-full bg-transparent border-b-2 border-gray-300
              focus:border-blue-600 focus:outline-none
              text-xl font-light text-gray-900
              placeholder:text-gray-400
              transition-colors duration-200
              py-2 resize-none
            `}
          />
          <div className="mt-4">
            <button
              onClick={onSubmit}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              OK
              <span className="text-blue-200 text-sm">press Cmd + Enter</span>
            </button>
          </div>
        </div>
      )}

      {value === null && (
        <p className="mt-4 text-gray-400 text-sm">
          Press <span className="font-mono bg-gray-100 px-1 rounded">Y</span> for
          Yes or <span className="font-mono bg-gray-100 px-1 rounded">N</span>{" "}
          for No
        </p>
      )}
    </div>
  );
}
