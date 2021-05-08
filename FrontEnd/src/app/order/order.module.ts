import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order/order.component';
import { OrderMenuComponent } from './components/menu/menu.component';
import { StoreModule } from '@ngrx/store';
import { orderRecuder } from './store/order.store.reducer';
import { BoardPricesComponent } from './dialogs/board-prices/board-prices.component';
import { OrderedItemsComponent } from './components/ordered-items/ordered-items.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderMenuComponent,
    BoardPricesComponent,
    OrderedItemsComponent,
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
    DatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrderModule {}
