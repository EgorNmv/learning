import e = require("express");

const okta = require("@okta/okta-sdk-nodejs");

export const getUserBySub = async (sub: string): Promise<{} | null> => {
  if (!sub) {
    return null;
  }

  const client = new okta.Client({
    orgUrl: "https://dev-690537.okta.com",
    token: "00pgvhGvBBUkIJFKV1EBMzC-6nu7Lc7CAUe1QqMX4N",
  });
  let userFromOkta = null;

  try {
    userFromOkta = await client.getUser(`${sub}`);
  } catch (e) {
    console.error(
      `Error in getUserBySub Неизвестный пользователь c sub ${sub}`
    );
  }

  return userFromOkta;
};
