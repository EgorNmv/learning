import type { Dispatch } from 'react';
import { addRoute, removeRoute } from "./actions";
export type BreadcrumbsContextState = { [key: string]: string; };
export type BreadcrumbsContextAcions = ReturnType<typeof addRoute | typeof removeRoute>;
export type BreadcrumbsContext = {
  state: BreadcrumbsContextState,
  dispatch: Dispatch<BreadcrumbsContextAcions>,
};
