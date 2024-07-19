import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModulesModule } from './module/modules/modules.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddFormComponent } from './components/add-form/add-form.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthServiceService } from './Auth/Service/auth-service.service';
import { JwtInterceptor } from './Auth/Interceptor/jwt.interceptor';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    HomepageComponent,
    NavBarComponent,
    AddFormComponent,
    DetailViewComponent,
    StarRatingComponent,
    TableViewComponent,
    GridViewComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModulesModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8081'],
        disallowedRoutes: ['localhost:8081/auth-api/login']
      }
    })
  ],
  providers: [
    AuthServiceService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
