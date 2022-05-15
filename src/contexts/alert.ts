import { createContext, useContext } from "react";

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

export default AlertContext;
