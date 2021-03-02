import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { LogInComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    LogInComponent,
    RegisterComponent,
    ProfileComponent,
    // BoardUsersComponent,
  ],
  exports: [
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    authInterceptorProviders,
  ],
})
export class AuthModule { }
