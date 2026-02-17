"use client";

import { useEffect, useCallback, useRef } from "react";
import { QuestionOption } from "@/lib/schemas/questionnaire";

interface SingleSelectQuestionProps {
  value: string | null;
  onChange: (value: string) => void;
  onSubmit: () => void;
  options: QuestionOption[];
}

export function SingleSelectQuestion({
  value,
  onChange,
  onSubmit,
  options,
}: SingleSelectQuestionProps) {
  const prevValueRef = useRef(value);

  const selectOption = useCallback(
    (optionId: string) => {
      onChange(optionId);
    },
    [onChange]
  );

  // Auto-submit after selection (after state update completes)
  // Only submit if value actually changed (not on initial render or re-renders)
  useEffect(() => {
    const valueChanged = prevValueRef.current !== value;
    prevValueRef.current = value;

    if (valueChanged && value !== null) {
      const timer = setTimeout(() => onSubmit(), 200);
      return () => clearTimeout(timer);
    }
  }, [value, onSubmit]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Letter keys A-Z select options
      const keyCode = e.key.toUpperCase().charCodeAt(0) - 65;
      if (keyCode >= 0 && keyCode < options.length) {
        e.preventDefault();
        selectOption(options[keyCode].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [options, selectOption]);

  return (
    <div>
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = value === option.id;
          const keyLabel = String.fromCharCode(65 + index); // A, B, C, ...

          return (
            <button
              key={option.id}
              onClick={() => selectOption(option.id)}
              className={`
                w-full text-left px-4 py-3 rounded-lg border-2 transition-all
                flex items-center gap-3
                ${
                  isSelected
                    ? "border-[#D97757] bg-[#D97757]"
                    : "border-border-secondary hover:border-[#D97757]"
                }
              `}
            >
              <span
                className={`
                  w-7 h-7 rounded border-2 flex items-center justify-center text-sm font-bold shrink-0
                  ${
                    isSelected
                      ? "border-[#D97757] bg-[#D97757] text-white"
                      : "border-border-secondary text-content-muted"
                  }
                `}
              >
                {keyLabel}
              </span>
              <span
                className={`text-lg ${isSelected ? "text-white" : "text-content-secondary"}`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-content-muted text-sm">
        Press{" "}
        <span className="font-mono bg-surface-tertiary px-1 rounded">A</span>-
        <span className="font-mono bg-surface-tertiary px-1 rounded">
          {String.fromCharCode(64 + options.length)}
        </span>{" "}
        to select
      </p>
    </div>
  );
}
