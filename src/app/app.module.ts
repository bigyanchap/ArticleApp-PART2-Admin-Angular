import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './components/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { KeywordModule } from './components/keyword/keyword.module';
import { ArticleModule } from './components/Article/article.module';
import { SynonymDialogComponent } from './components/keyword/synonym-dialog/synonym-dialog.component';
import { CategoryModule } from './components/category/category.module';
import { LocationMgmtModule } from './components/location-mgmt/location-mgmt.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DashboardModule,
    AuthModule,
    SharedModule,
    ArticleModule,
    LocationMgmtModule,
    CategoryModule,
    HttpClientModule,
    KeywordModule,
    OAuthModule.forRoot(),
  ],
  entryComponents: [
    SynonymDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
