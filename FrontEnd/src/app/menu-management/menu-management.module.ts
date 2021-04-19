import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
//import { StoreModule } from '@ngrx/store';
import { MenuManagementRoutingModule } from './menu-management-routing.module';
import { BoardMenuManagementComponent } from './components/board-menu-management/board-menu-management.component';

@NgModule({
  declarations: [
    BoardMenuManagementComponent,
  ],
  imports: [
    CommonModule,
    MenuManagementRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    //StoreModule.forFeature('restaurant', restaurantRecuder),
  ],
  exports: [
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuManagementModule {}
