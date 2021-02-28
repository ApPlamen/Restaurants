import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LogInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
