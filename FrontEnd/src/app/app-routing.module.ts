import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';

@NgModule({
  imports: [AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
