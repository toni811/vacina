import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { ImpfungListComponent } from './impfung-list/impfung-list.component';
import { OrtLisComponent } from './ort-lis/ort-lis.component';
import { ImpfungListItemComponent } from './impfung-list-item/impfung-list-item.component';
import { ImpfungDetailsComponent } from './impfung-details/impfung-details.component';
import {ImpfungStoreService} from './shared/impfung-store.service';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { ImpfungFormComponent } from './impfung-form/impfung-form.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from './shared/authentication.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from './shared/token-interceptor.service';
import {JwtInterceptorService} from './shared/jwt-interceptor.service';
import { UserListItemComponent } from './user-list-item/user-list-item.component';




@NgModule({
  declarations: [
    AppComponent,
    ImpfungListComponent,
    OrtLisComponent,
    ImpfungListItemComponent,
    ImpfungDetailsComponent,
    HomeComponent,
    ImpfungFormComponent,
    LoginComponent,
    UserListItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule
  ],
  providers: [ImpfungStoreService,
              AuthenticationService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptorService,
          multi: true
      }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
