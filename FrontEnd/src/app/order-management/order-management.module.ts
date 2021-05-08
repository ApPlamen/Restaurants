import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { BoardOrderManagementComponent } from './components/board-order-management/board-order-management.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { BoardOrderedMenuItemsComponent } from './components/board-ordered-menu-items/board-ordered-menu-items.component';

@NgModule({
  declarations: [
    OrderManagementComponent,
    BoardOrderManagementComponent,
    BoardOrderedMenuItemsComponent,
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
    DatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrderManagementModule {}
