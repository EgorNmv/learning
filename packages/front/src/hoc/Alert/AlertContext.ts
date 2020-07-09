import React from "react";
import { Alert, AlertTypes } from "../../utils/types";

type AlertWithHideAndShowFunctions = {
  alert: Alert;
  hideAlert: () => void;
  showAlert: (message: string, type?: AlertTypes) => void;
};

export const AlertContext = React.createContext<AlertWithHideAndShowFunctions>(
  {} as AlertWithHideAndShowFunctions
);
