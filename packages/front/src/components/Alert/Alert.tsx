import React from "react";
import { Alert as AntdAlert } from "antd";
import { AlertContext } from "../../hoc/Alert/AlertContext";

export const Alert: React.FC = () => {
  const { alert } = React.useContext(AlertContext);

  if (!alert) {
    return null;
  }

  return (
    <AntdAlert
      closable
      banner
      message={alert.message}
      type={alert.type}
      style={{
        margin: "-1rem 0 1rem 0",
      }}
    />
  );
};
