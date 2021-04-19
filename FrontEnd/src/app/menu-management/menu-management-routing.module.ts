import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesEnum } from '../core/auth/enums/roles.enum';
import { AuthGuard } from '../shared/guards/auth-guard';
import { BoardMenuManagementComponent } from './components/board-menu-management/board-menu-management.component';

const routes: Routes = [
  {
    path: ':id',
    //canActivate: [AuthGuard],
    //data: { accessRoles: [RolesEnum.admin, RolesEnum.companyOwner, RolesEnum.restaurantAdmin, RolesEnum.restaurant] },
    component: BoardMenuManagementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuManagementRoutingModule { }
