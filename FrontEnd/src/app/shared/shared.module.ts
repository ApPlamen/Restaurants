import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SimpleTableComponent } from './components/simple-table/simple-table.component';
import { authInterceptorProviders } from './interceptors/auth.interceptor';


@NgModule({
  declarations: [
    SimpleTableComponent,
    InputComponent,
    ButtonComponent,
    NavbarComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SimpleTableComponent,
    InputComponent,
    ButtonComponent,
    NavbarComponent,
  ],
  providers: [
    authInterceptorProviders,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
