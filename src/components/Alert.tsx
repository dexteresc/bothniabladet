import { useEffect, useState } from "react";

export default function Alert({
  type,
  message,
  timeout = 5000,
  onClose
}: {
  type?: "error" | "success";
  message: string;
  timeout?: number;
  onClose?: () => void;
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
        className="absolute z-40 bottom-4 left-4 lg:left-[21rem] right-4 bg-red-300 text-red-900 rounded p-2"
        role="alert"
      >
        {message}
      </div>
    ) : null;
  }
  if (type === "success") {
    return isOpen ? (
      <div
        className="absolute z-40 bottom-4 left-4 lg:left-[21rem] right-4 bg-green-300 text-green-900 rounded p-2"
        role="alert"
      >
        {message}
      </div>
    ) : null;
  }
  return isOpen ? (
    <div
      className="absolute z-40 bottom-4 left-4 lg:left-[21rem] right-4 bg-blue-300 text-blue-900 rounded p-2"
      role="alert"
    >
      {message}
    </div>
  ) : null;
}
