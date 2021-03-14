import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardUsersComponent } from './components/board-users-component/board-users-component.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LogInComponent } from './components/login/login.component';
import { LogOutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RolesEnum } from './enums/roles.enum';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout',
    canActivate: [AuthGuard],
    data: { accessRoles: [RolesEnum.admin, RolesEnum.restaurantAdmin, RolesEnum.restaurant, RolesEnum.client] },
    component: LogOutComponent },
  { path: 'profile',
    canActivate: [AuthGuard],
    data: { accessRoles: [RolesEnum.admin, RolesEnum.restaurantAdmin, RolesEnum.restaurant, RolesEnum.client] },
    component: ProfileComponent },
  { path: 'change-password',
    canActivate: [AuthGuard],
    data: { accessRoles: [RolesEnum.admin, RolesEnum.restaurantAdmin, RolesEnum.restaurant, RolesEnum.client] },
    component: ChangePasswordComponent },
  { path: 'users',
    canActivate: [AuthGuard],
    data: { accessRoles: [RolesEnum.admin, RolesEnum.restaurantAdmin] },
    component: BoardUsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
