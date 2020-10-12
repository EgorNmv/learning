type OktaUserProfile = {
  firstName: string;
  lastName: string;
  mobilePhone: null | string;
  secondEmail: null | string;
  userType: string;
  login: string;
  email: string;
};
/**
 * Это только малая часть полей,
 * в возвращаемом октой юзере ещё много всего
 */
export type OktaUser = {
  id: string;
  status: string;
  created: string;
  activated: any;
  statusChanged: Date;
  lastLogin: Date;
  lastUpdated: Date;
  passwordChanged: Date;
  type: { id: string };
  profile: OktaUserProfile;
};
/**
 * Jwt после validateTolken(),
 * не все вовзвращаемые поля описаны
 */
export type ValidJwt = {
  header: {
    typ: string;
    alg: string;
    kid: string;
  };
  toString: Function;
  claims: {
    ver: number;
    jti: string;
    iss: string;
    aud: string;
    iat: number;
    exp: number;
    cid: string;
    uid: string;
    scp: string[];
    sub: string;
  };
};
