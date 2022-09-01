import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  //issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
  clientId: 'client_AngularAdmin',
  issuer: 'https://localhost:44336', 
  responseType:'code',
  logoutUrl:'https://localhost:44336/auth/login',
  

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id. The SPA is registered with this id at the auth-server
  postLogoutRedirectUri:window.location.origin+ '/dashboard/default',
  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email ApiOne',


  showDebugInformation: true,

}