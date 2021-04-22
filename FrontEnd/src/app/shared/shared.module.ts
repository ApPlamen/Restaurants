import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SimpleTableComponent } from './components/simple-table/simple-table.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ManageRolesComponent } from './dialogs/manage-roles/manage-roles.component';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { sharedRecuder } from './store/sharedStore.reducer';


@NgModule({
  declarations: [
    SimpleTableComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    NavbarComponent,
    ManageRolesComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('shared', sharedRecuder),
  ],
  exports: [
    SimpleTableComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    NavbarComponent,
  ],
  providers: [
    authInterceptorProviders,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
