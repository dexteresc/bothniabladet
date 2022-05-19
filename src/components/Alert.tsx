import { useEffect, useState } from "react";

export default function Alert({
  type,
  message,
  timeout = 5000,
  onClose,
  className = ""
}: {
  type?: "error" | "success" | "default";
  message: string;
  timeout?: number;
  onClose?: () => void;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      onClose?.();
    }, timeout);
    return () => clearTimeout(timer);
  });
  if (type === "error") {
    return isOpen ? (
      <div
        className={`z-40 mt-2 bg-red-300 text-red-900 rounded p-2 ${className}`}
        role="alert"
      >
        {message}
      </div>
    ) : null;
  }
  if (type === "success") {
    return isOpen ? (
      <div
        className={`z-40 mt-2 bg-green-300 text-green-900 rounded p-2 ${className}`}
        role="alert"
      >
        {message}
      </div>
    ) : null;
  }
  return isOpen ? (
    <div
      className={`z-40 mt-2 bg-blue-300 text-blue-900 rounded p-2 ${className}`}
      role="alert"
    >
      {message}
    </div>
  ) : null;
}
