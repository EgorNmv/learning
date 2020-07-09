import React from "react";

export const UserContext = React.createContext<{
  group: string;
  sub: string;
  name: string;
} | null>(null);
