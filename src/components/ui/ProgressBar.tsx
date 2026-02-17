"use client";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressBar({ currentStep, totalSteps, className = "" }: ProgressBarProps) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm text-content-secondary mb-2">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{progress}% complete</span>
      </div>
      <div className="w-full h-2 bg-progress-track rounded-full overflow-hidden">
        <div
          className="h-full bg-[#D97757] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
