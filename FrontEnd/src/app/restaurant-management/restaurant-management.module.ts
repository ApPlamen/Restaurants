import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { BoardRestaurantComponent } from './components/board-restaurant-management/board-restaurant-management.component';
import { StoreModule } from '@ngrx/store';
import { restaurantRecuder } from './store/restaurant.store.reducer';
import { CreateEditRestaurantComponent } from './dialogs/create-edit-restaurant/create-edit-restaurant.component';
import { RestaurantManagementRoutingModule } from './restaurant-management-routing.module';

@NgModule({
  declarations: [
    BoardRestaurantComponent,
    CreateEditRestaurantComponent,
  ],
  imports: [
    CommonModule,
    RestaurantManagementRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature('restaurant', restaurantRecuder),
  ],
  exports: [
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RestaurantManagementModule {}
