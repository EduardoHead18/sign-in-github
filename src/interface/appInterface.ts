export interface IData {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri: string;
}
export interface IUserInfo {
  name: string;
  avatar_url: string;
  bio: string;
}
export interface IDiscovery {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  revocationEndpoint: string;
}
//implent discovery data endpoints
export const discovery : IDiscovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    revocationEndpoint:
      "https://github.com/settings/connections/applications/0bd22da418910923430f",
  };
