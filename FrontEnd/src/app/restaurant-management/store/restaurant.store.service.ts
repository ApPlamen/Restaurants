import * as RestaurantActions from './restaurant.store.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RestaurantState, getRestaurantId } from './restaurant.store.state';

@Injectable({
  providedIn: 'root'
})
export class RestaurantStoreService {
  constructor(private restaurantStore: Store<RestaurantState>) { }

  public get getRestaurantId$(): Observable<string> {
    return this.restaurantStore.select(getRestaurantId);
  }

  public set setRestaurantId(restaurantId: string) {
    this.restaurantStore.dispatch( new RestaurantActions.SetRestaurantId(restaurantId) );
  }
}
