import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesEnum } from '../core/auth/enums/roles.enum';
import { AuthGuard } from '../shared/guards/auth-guard';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: { accessRoles: [RolesEnum.client] },
    component: OrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
