import * as okta from "@okta/okta-sdk-nodejs";

export const createOktaSdkClient = () => {
  const client = new okta.Client({
    orgUrl: process.env.OKTA_ORG_URL,
    token: process.env.OKTA_SDK_NODEJS_TOKEN,
  });

  return client;
};
