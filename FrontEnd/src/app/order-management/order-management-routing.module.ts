import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesEnum } from '../core/auth/enums/roles.enum';
import { AuthGuard } from '../shared/guards/auth-guard';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { OrderManagementGuard } from './guards/order-management-guard';

const routes: Routes = [
  {
    path: ':restaurantId/orders',
    canActivate: [AuthGuard, OrderManagementGuard],
    data: { accessRoles: [RolesEnum.companyOwner, RolesEnum.restaurantAdmin, RolesEnum.restaurant] },
    component: OrderManagementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
