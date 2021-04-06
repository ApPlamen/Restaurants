import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LogInComponent } from './auth/components/login/login.component';
import { LogOutComponent } from './auth/components/logout/logout.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ProfileComponent } from './auth/components/profile/profile.component';
import { ChangePasswordComponent } from './auth/components/change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './auth/interceptors/auth.interceptor';
import { SharedModule } from '../shared/shared.module';
import { BoardUsersComponent } from './auth/components/board-users/board-users.component';
import { AuthRoutingModule } from './auth/auth-routing.module';

@NgModule({
  declarations: [
    LogInComponent,
    LogOutComponent,
    RegisterComponent,
    ProfileComponent,
    ChangePasswordComponent,
    BoardUsersComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AuthRoutingModule,
    //ErrorsRoutingModule,
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
    authInterceptorProviders,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule {}
