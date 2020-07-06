const CLIENT_ID = process.env.CLIENT_ID || '0oagqwp45W4HIpio94x6';
const ISSUER = process.env.ISSUER || 'https://dev-417692.okta.com/oauth2/default'
 
export default {
  clientId: CLIENT_ID,
  issuer: ISSUER,
  redirectUri: 'http://194.67.90.225:3000/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: false,
};
