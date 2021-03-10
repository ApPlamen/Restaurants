import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './core/auth/auth-routing.module';
import { ErrorsRoutingModule } from './core/auth/errors-routing.module';
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
