import { AuthChecker } from "type-graphql";
import { Context } from "../objects/context";

export const authChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles
): boolean => {
  if (context.validJwt) {
    return true;
  } else {
    return false;
  }
};
