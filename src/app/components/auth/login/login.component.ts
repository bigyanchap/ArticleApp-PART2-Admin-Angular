import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { OAuthService } from 'angular-oauth2-oidc';
// import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
// import {authConfig} from '../login/sso.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    
    this.createLoginForm();
    this.createRegisterForm();
    }

  // private configure() {
  //   this.oauthService.configure(authConfig);
  //   //this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  //   this.oauthService.loadDiscoveryDocumentAndTryLogin();
  // }

  // login(){
  //   this.oauthService.initLoginFlow();
  // }
  // logout(){    
  //   this.oauthService.logOut();
  // }
  // get token(){
  //   let claims:any=this.oauthService.getIdentityClaims();
  //   console.log(claims);
  //   return claims?claims:null;
  // }

  owlcarousel = [
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    }
  ]
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: [''],
    })
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: [''],
      password: [''],
      confirmPassword: [''],
    })
  }


  ngOnInit() {
  }

  onSubmit() {
    
  }

}
