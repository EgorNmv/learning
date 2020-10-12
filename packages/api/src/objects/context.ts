import { Connection } from "typeorm";
import { OktaUser, ValidJwt } from "../types";

/**
 * oktaSdkClient has many fields
 * https://github.com/okta/okta-sdk-nodejs
 */
export type Context = {
  connection: Connection;
  validJwt: ValidJwt | null;
  oktaSdkClient: {
    getUser: () => Promise<OktaUser>;
  };
};
