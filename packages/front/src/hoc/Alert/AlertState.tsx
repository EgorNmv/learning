import React from "react";
import { AlertContext } from "./AlertContext";
import { Alert, AlertTypes } from "../../utils/types";

export const AlertState: React.FC = ({ children }) => {
  const [alert, setAlert] = React.useState<Alert>(null);

  const hideAlert = (): void => setAlert(null);
  const showAlert = (message: string, type: AlertTypes = "success"): void => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <AlertContext.Provider value={{ hideAlert, showAlert, alert }}>
      {children}
    </AlertContext.Provider>
  );
};
