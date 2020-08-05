const okta = require("@okta/okta-sdk-nodejs");

export const getUserBySub = async (sub: string): Promise<any> => {
  if (!sub) {
    return null;
  }

  const client = new okta.Client({
    orgUrl: "https://dev-690537.okta.com",
    token: "00pgvhGvBBUkIJFKV1EBMzC-6nu7Lc7CAUe1QqMX4N",
  });
  const userFromOkta = await client.getUser(`${sub}`);

  return userFromOkta;
};
