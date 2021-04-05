import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error403Component } from './errors/error-403/error-403.component';
import { Error404Component } from './errors/error-404/error-404.component';

const routes: Routes = [
  { path: 'error-403', component: Error403Component },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
