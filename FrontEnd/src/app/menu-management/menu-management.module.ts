import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MenuManagementRoutingModule } from './menu-management-routing.module';
import { BoardMenuManagementComponent } from './components/board-menu-management/board-menu-management.component';
import { StoreModule } from '@ngrx/store';
import { menuManagementRecuder } from './store/menu-management.store.reducer';
import { CreateEditMenuItemComponent } from './dialogs/create-edit-menu-item/create-edit-menu-item.component';
import { CreateEditPriceComponent } from './dialogs/create-edit-price/create-edit-price.component';
import { BoardPricesComponent } from './dialogs/board-prices/board-prices.component';

@NgModule({
  declarations: [
    BoardMenuManagementComponent,
    CreateEditMenuItemComponent,
    BoardPricesComponent,
    CreateEditPriceComponent,
  ],
  imports: [
    CommonModule,
    MenuManagementRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature('menu-management', menuManagementRecuder),
  ],
  exports: [
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuManagementModule {}
