import React from "react";
import "./CenteredText.css";

export const CenteredText: React.FC = (props) => (
  <div className="centered-text-content">{props.children}</div>
);
