import * as okta from "@okta/okta-sdk-nodejs";
import { OktaUser } from "../../../types";

/**
 * Returned okta user by sub or by email
 * @param {string} identifier - sub || email
 */
export const getUserBySubOrEmail = async (
  identifier: string,
  oktaSdkClient = null
): Promise<OktaUser | null> => {
  if (!identifier) {
    return null;
  }

  let oktaUser: null | OktaUser = null;

  try {
    if (oktaSdkClient) {
      oktaUser = (await oktaSdkClient.getUser(identifier)) as OktaUser;
    } else {
      const client = new okta.Client({
        orgUrl: process.env.OKTA_ORG_URL,
        token: process.env.OKTA_SDK_NODEJS_TOKEN,
      });
      oktaUser = (await client.getUser(identifier)) as OktaUser;
    }
  } catch (e) {
    console.error(
      `Error in getUserBySub Неизвестный пользователь c sub или email ${identifier}`
    );
  }

  return oktaUser;
};
