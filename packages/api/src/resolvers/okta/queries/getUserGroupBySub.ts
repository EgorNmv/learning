import { getUserBySubOrEmail } from "./getUserBySub";
/**
 * Returned okta user type by sub
 * @param {string} sub - id of okta user
 */
export const getUserGroupBySub = async (
  oktaSdkClient,
  sub: string
): Promise<string> => {
  let userType: string = "1";

  if (!sub) {
    return userType;
  }

  const userFromOkta = await getUserBySubOrEmail(sub, oktaSdkClient);

  return userFromOkta.profile.userType;
};
