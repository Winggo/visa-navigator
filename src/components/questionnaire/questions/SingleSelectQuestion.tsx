"use client";

import { useEffect, useCallback } from "react";
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
  const selectOption = useCallback(
    (optionId: string) => {
      onChange(optionId);
      // Auto-submit after selection with small delay for visual feedback
      setTimeout(() => onSubmit(), 200);
    },
    [onChange, onSubmit]
  );

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
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <span
                className={`
                  w-7 h-7 rounded border-2 flex items-center justify-center text-sm font-bold shrink-0
                  ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-400 text-gray-400"
                  }
                `}
              >
                {keyLabel}
              </span>
              <span
                className={`text-lg ${isSelected ? "text-gray-900" : "text-gray-700"}`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-gray-400 text-sm">
        Press{" "}
        <span className="font-mono bg-gray-100 px-1 rounded">A</span>-
        <span className="font-mono bg-gray-100 px-1 rounded">
          {String.fromCharCode(64 + options.length)}
        </span>{" "}
        to select
      </p>
    </div>
  );
}
