import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { ErrorsRoutingModule } from './auth/errors-routing.module';
import { HomeRoutingModule } from './home/home-routing.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    HomeRoutingModule,
    ErrorsRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
