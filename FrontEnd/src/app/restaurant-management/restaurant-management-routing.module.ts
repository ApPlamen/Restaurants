import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesEnum } from '../core/auth/enums/roles.enum';
import { AuthGuard } from '../core/auth/guards/auth-guard';
import { BoardRestaurantComponent } from './components/board-restaurant-management/board-restaurant-management.component';

const routes: Routes = [
  {
    path: 'restaurants-management',
    canActivate: [AuthGuard],
    data: { accessRoles: [RolesEnum.admin, RolesEnum.companyOwner, RolesEnum.restaurantAdmin] },
    component: BoardRestaurantComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantManagementRoutingModule { }
