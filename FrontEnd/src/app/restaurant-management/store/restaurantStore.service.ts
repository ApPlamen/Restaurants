import * as RestaurantActions from './restaurantStore.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RestaurantState, getRestaurantId } from './restaurantStore.state';

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
