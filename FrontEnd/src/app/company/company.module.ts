import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { BoardCompanyComponent } from './components/board-company/board-company.component';
import { CreateEditCompanyComponent } from './dialogs/create-edit-company/create-edit-company.component';
import { StoreModule } from '@ngrx/store';
import { companyRecuder } from './store/companyStore.reducer';
import { CompanyForm } from './forms/company.form';

@NgModule({
  declarations: [
    BoardCompanyComponent,
    CreateEditCompanyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature('company', companyRecuder),
  ],
  exports: [
  ],
  providers: [
    CompanyForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CompanyModule {}
