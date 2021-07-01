import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'companies',
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
  },
  {
    path: 'restaurants-management',
    loadChildren: () => import('./restaurant-management/restaurant-management.module').then(m => m.RestaurantManagementModule),
  },
  {
    path: 'restaurants-management/restaurant',
    loadChildren: () => import('./menu-management/menu-management.module').then(m => m.MenuManagementModule),
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
  },
  {
    path: 'order-management/restaurant',
    loadChildren: () => import('./order-management/order-management.module').then(m => m.OrderManagementModule),
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
