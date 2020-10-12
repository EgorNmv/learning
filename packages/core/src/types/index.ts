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
