import React, { createContext, PropsWithChildren, useContext, useReducer } from "react";
import { breadcrumbsContextInitialState, breadcrumbsContextReducer } from "./reducer";
import { BreadcrumbsContext } from "./types";

const breadcrumbContextInitialContext = {
  state: breadcrumbsContextInitialState,
  dispatch: () => ({}),
};

const BreadcrumbContext = createContext<BreadcrumbsContext>(breadcrumbContextInitialContext);

type BreadCrumbContextProviderProps = PropsWithChildren<{}>


export * from './actions';
export const BreadCrumbContextProvider = ({ children }: BreadCrumbContextProviderProps) => {
  const [state, dispatch] = useReducer(breadcrumbsContextReducer, breadcrumbsContextInitialState);
  return (
    <BreadcrumbContext.Provider value={{ state, dispatch }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadCrumbContext = () => {
  const context = useContext(BreadcrumbContext);
  return context;
};
