import * as MenuManagementActions from './menu-management.store.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuManagementState, getMenuItemId, getRestaurantId, getPriceId } from './menu-management.store.state';

@Injectable({
  providedIn: 'root'
})
export class MenuManagementStoreService {
  constructor(private menuManagementStore: Store<MenuManagementState>) { }

  public get getMenuItemId$(): Observable<string> {
    return this.menuManagementStore.select(getMenuItemId);
  }

  public set setMenuItemId(menuItemId: string) {
    this.menuManagementStore.dispatch( new MenuManagementActions.SetMenuItemId(menuItemId) );
  }

  public get getRestaurantId$(): Observable<string> {
    return this.menuManagementStore.select(getRestaurantId);
  }

  public set setRestaurantId(restaurantId: string) {
    this.menuManagementStore.dispatch( new MenuManagementActions.SetRestaurantId(restaurantId) );
  }

  public get getPriceId$(): Observable<string> {
    return this.menuManagementStore.select(getPriceId);
  }

  public set setPriceId(priceId: string) {
    this.menuManagementStore.dispatch( new MenuManagementActions.SetPriceId(priceId) );
  }
}
