import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order/order.component';
import { OrderMenuComponent } from './components/menu/menu.component';
import { StoreModule } from '@ngrx/store';
import { orderRecuder } from './store/order.store.reducer';
import { BoardPricesComponent } from './dialogs/board-prices/board-prices.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderMenuComponent,
    BoardPricesComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature('order', orderRecuder),
  ],
  exports: [
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrderModule {}
