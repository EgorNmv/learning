import { ADD_ROUTE, REMOVE_ROUTE } from "./constants";
type Action<T extends string, U extends any = any> = {
  type: T,
  payload: U,
}
export const addRoute = (
  key: string,
  value: string,
): Action<typeof ADD_ROUTE, { key: string, value: string }> => ({ type: ADD_ROUTE, payload: { key, value } });

export const removeRoute = (
  key: string,
): Action<typeof REMOVE_ROUTE, { key: string }> => ({ type: REMOVE_ROUTE, payload: { key } });
