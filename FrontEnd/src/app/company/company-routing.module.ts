import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesEnum } from '../core/auth/enums/roles.enum';
import { AuthGuard } from '../core/auth/guards/auth-guard';
import { BoardCompanyComponent } from './components/board-company/board-company.component';

const routes: Routes = [
  {
    path: 'companies',
    canActivate: [AuthGuard],
    data: { accessRoles: [RolesEnum.admin, RolesEnum.companyOwner] },
    component: BoardCompanyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
