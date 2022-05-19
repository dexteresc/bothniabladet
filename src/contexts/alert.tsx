import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Alert from "@/components/Alert";

interface IAlertContext {
  addAlert: (
    type: "error" | "success" | "default",
    message: string,
    className?: string
  ) => void;
  removeAlert: (index: number) => void;
}

const AlertContext = createContext<IAlertContext>({
  addAlert: () => {},
  removeAlert: () => {}
});

export function useAlert() {
  return useContext(AlertContext);
}

function AlertProvider({ children }: { children: React.ReactNode }) {
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
        className="flex flex-col fixed bottom-4 left-4 lg:left-[21rem] right-4 
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

export default AlertProvider;
