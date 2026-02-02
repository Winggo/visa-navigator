"use client";

interface ProgressDotsProps {
  current: number;
  total: number;
}

export function ProgressDots({ current, total }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const isCompleted = i + 1 < current;
        const isCurrent = i + 1 === current;

        return (
          <div
            key={i}
            className={`
              rounded-full transition-all duration-300
              ${isCurrent ? "w-6 h-2 bg-blue-600" : "w-2 h-2"}
              ${isCompleted ? "bg-blue-600" : ""}
              ${!isCompleted && !isCurrent ? "bg-gray-300" : ""}
            `}
          />
        );
      })}
    </div>
  );
}
