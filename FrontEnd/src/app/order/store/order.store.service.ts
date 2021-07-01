import * as OrderActions from './order.store.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderState, getMenuItemId } from './order.store.state';

@Injectable({
  providedIn: 'root'
})
export class OrderStoreService {
  constructor(private orderStore: Store<OrderState>) { }

  public get getMenuItemId$(): Observable<string> {
    return this.orderStore.select(getMenuItemId);
  }

  public set setMenuItemId(menuItemId: string) {
    this.orderStore.dispatch( new OrderActions.SetMenuItemId(menuItemId) );
  }
}
