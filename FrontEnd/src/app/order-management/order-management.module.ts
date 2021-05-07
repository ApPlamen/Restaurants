import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { BoardOrderManagementComponent } from './components/board-order-management/board-order-management.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';

@NgModule({
  declarations: [
    OrderManagementComponent,
    BoardOrderManagementComponent,
  ],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrderManagementModule {}
