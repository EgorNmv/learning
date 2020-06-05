import React from "react";
import "./CenteredText.css";

type CenteredTextProps = {
  style?: { [key: string]: string };
  className?: string;
};

export const CenteredText: React.FC<CenteredTextProps> = (props) => (
  <div
    className={`centered-text-content ${props.className}`}
    style={{ ...props.style }}
  >
    {props.children}
  </div>
);
