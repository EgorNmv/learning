import { ADD_ROUTE, REMOVE_ROUTE } from "./constants";
import { BreadcrumbsContextAcions, BreadcrumbsContextState } from "./types";

export const breadcrumbsContextInitialState: BreadcrumbsContextState = {};
export const breadcrumbsContextReducer = (
  state: BreadcrumbsContextState,
  action: BreadcrumbsContextAcions,
): BreadcrumbsContextState => {
  switch (action.type) {
    case ADD_ROUTE: {
      state[action.payload.key] = action.payload.value;
      return state;
    }
    case REMOVE_ROUTE: {
      delete state[action.payload.key];
      return state;
    }
    default:
      return state;
  };
};