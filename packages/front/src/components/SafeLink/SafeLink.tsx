import React from "react";
import { Link, useLocation, LinkProps } from "react-router-dom";

export const SafeLink: React.FC<LinkProps> = (props) => {
  const location = useLocation();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (location.pathname === props.to) {
      e.preventDefault();
    }
  };

  return (
    <Link {...props} onClick={onClick}>
      {props.children}
    </Link>
  );
};
