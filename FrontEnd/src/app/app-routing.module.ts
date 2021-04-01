import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyRoutingModule } from './company/company-routing.module';
import { AuthRoutingModule } from './core/auth/auth-routing.module';
import { ErrorsRoutingModule } from './core/auth/errors-routing.module';
import { HomeRoutingModule } from './home/home-routing.module';
import { RestaurantManagementRoutingModule } from './restaurant-management/restaurant-management-routing.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    HomeRoutingModule,
    CompanyRoutingModule,
    RestaurantManagementRoutingModule,
    ErrorsRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
