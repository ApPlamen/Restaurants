import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { BoardCompanyComponent } from './components/board-company/board-company.component';
import { CreateEditCompanyComponent } from './dialogs/create-edit-company/create-edit-company.component';
import { StoreModule } from '@ngrx/store';
import { companyRecuder } from './store/companyStore.reducer';
import { CompanyRoutingModule } from './company-routing.module';

@NgModule({
  declarations: [
    BoardCompanyComponent,
    CreateEditCompanyComponent,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature('company', companyRecuder),
  ],
  exports: [
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CompanyModule {}
