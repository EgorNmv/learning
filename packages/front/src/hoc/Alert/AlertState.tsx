import React from "react";
import { AlertContext } from "./AlertContext";
import { Alert, AlertTypes } from "../../utils/types";

export const AlertState: React.FC = ({ children }) => {
  const [alert, setAlert] = React.useState<Alert>(null);
  const [timer, setTimer] = React.useState<NodeJS.Timeout>();

  const hideAlert = (): void => setAlert(null);
  const showAlert = (message: string, type: AlertTypes = "success"): void => {
    if (timer) {
      clearTimeout(timer);
    }
    setAlert({ message, type });
    setTimer(
      setTimeout(() => {
        setAlert(null);
      }, 3000)
    );
  };

  return (
    <AlertContext.Provider value={{ hideAlert, showAlert, alert }}>
      {children}
    </AlertContext.Provider>
  );
};
