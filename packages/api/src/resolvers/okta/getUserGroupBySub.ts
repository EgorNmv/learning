const okta = require("@okta/okta-sdk-nodejs");

export const getUserGroupBySub = async (sub: string): Promise<string> => {
  const client = new okta.Client({
    orgUrl: "https://dev-417692.okta.com/",
    token: "00SarV8WIA3R8hQIcJeT2gotR37LKUarKJowpL1tWR",
  });
  let userType: string = "1";

  if (!sub) {
    return userType;
  }

  const userFromOkta = await client.getUser(`${sub}`);
  console.info("userFromOkta", userFromOkta);
  if (userFromOkta.profile.userType) {
    userType =
      userFromOkta.profile.userType.toLowerCase() === "admin"
        ? "0"
        : userFromOkta.profile.userType.toLowerCase();
  }

  return userType;
};
