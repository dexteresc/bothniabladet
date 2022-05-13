import { useEffect, useMemo, useState } from "react";
import AlertContext from "@/contexts/alert";

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
        className={`z-40 mt-2 bg-green-300 text-green-900 rounded p-2 ${
          className
        }`}
        role="alert"
      >
        {message}
      </div>
    ) : null;
  }
  return isOpen ? (
    <div
      className={`z-40 mt-2 bg-blue-300 text-blue-900 rounded p-2 ${
        className
      }`}
      role="alert"
    >
      {message}
    </div>
  ) : null;
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<
    {
      type: "error" | "success" | "default";
      message: string;
      className: string;
    }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }
  }, [isOpen]);

  const addAlert = (
    type: "error" | "success" | "default",
    message: string,
    className: string = ""
  ) => {
    console.log("addAlert", type, message, className);
    setAlerts([...alerts, { type, message, className }]);
    setIsOpen(true);
  };
  const removeAlert = (index: number) => {
    setAlerts([...alerts.slice(0, index), ...alerts.slice(index + 1)]);
  };

  const value = useMemo(
    () => ({ addAlert, removeAlert, alerts }),
    [alerts, addAlert, removeAlert]
  );
  return (
    <AlertContext.Provider value={value}>
      {children}
      <div
        className="flex flex-col absolute bottom-4 left-4 lg:left-[21rem] right-4 
"
      >
        {alerts.map(({ message, type, className }, index) => (
          <Alert
            // eslint-disable-next-line react/no-array-index-key
            key={message + index}
            type={type}
            message={message}
            onClose={() => removeAlert(index)}
            className={className}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
}
