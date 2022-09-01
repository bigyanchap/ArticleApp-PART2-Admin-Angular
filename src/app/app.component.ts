import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from './sso.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private oauthService: OAuthService) {
    this.configure();

  }

  private configure() {
    // this.oauthService.configure(authConfig);
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    // this.oauthService.loadDiscoveryDocumentAndLogin();
    //this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initLoginFlow();
  }
  logout() {
    this.oauthService.logOut();
  }
  token() {
    let claims: any = this.oauthService.getIdentityClaims();
    localStorage.setItem('token', this.oauthService.getAccessToken());
    return claims ? claims : null;
  }

  title = 'multikart-backend';
}
