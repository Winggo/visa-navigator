interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-border-primary flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-content-primary">O-1 Visa Assistant</h2>
        <p className="text-sm text-content-muted">
          Ask me anything about the O-1 visa process
        </p>
      </div>
      <button
        onClick={onClose}
        aria-label="Close chat"
        className="p-2 hover:bg-surface-tertiary rounded-lg transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-content-muted"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
