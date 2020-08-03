const okta = require("@okta/okta-sdk-nodejs");

export const getUserGroupBySub = async (sub: string): Promise<string> => {
  const client = new okta.Client({
    orgUrl: "https://dev-690537.okta.com",
    token: "00pgvhGvBBUkIJFKV1EBMzC-6nu7Lc7CAUe1QqMX4N",
  });
  let userType: string = "1";

  if (!sub) {
    return userType;
  }

  const userFromOkta = await client.getUser(`${sub}`);

  if (userFromOkta.profile.userType) {
    userType =
      userFromOkta.profile.userType.toLowerCase() === "admin"
        ? "0"
        : userFromOkta.profile.userType.toLowerCase();
  }

  return userType;
};
