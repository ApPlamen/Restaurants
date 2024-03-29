import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth-guard';
import { BoardUsersComponent } from './components/board-users/board-users.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LogInComponent } from './components/login/login.component';
import { LogOutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RolesEnum } from './enums/roles.enum';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'logout',
    canActivate: [AuthGuard],
    data: { accessRoles: [RolesEnum.admin, RolesEnum.companyOwner, RolesEnum.restaurantAdmin, RolesEnum.restaurant, RolesEnum.client] },
    component: LogOutComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    data: { accessRoles: [RolesEnum.admin, RolesEnum.companyOwner, RolesEnum.restaurantAdmin, RolesEnum.restaurant, RolesEnum.client] },
    component: ProfileComponent
  },
  {
    path: 'change-password',
    canActivate: [AuthGuard],
    data: { accessRoles: [RolesEnum.admin, RolesEnum.companyOwner, RolesEnum.restaurantAdmin, RolesEnum.restaurant, RolesEnum.client] },
    component: ChangePasswordComponent
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    data: { accessRoles: [RolesEnum.admin] },
    component: BoardUsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
