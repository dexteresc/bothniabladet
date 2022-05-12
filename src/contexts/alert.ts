import { createContext, useContext } from "react";

interface IAlertContext {
  // eslint-disable-next-line no-unused-vars
  addAlert: (type: "error" | "success" | "default", message: string) => void;
  // eslint-disable-next-line no-unused-vars
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