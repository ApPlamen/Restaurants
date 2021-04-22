import * as RestaurantActions from './restaurant.store.action';
import { RestaurantState, initialState } from './restaurant.store.state';

export function restaurantRecuder(state: RestaurantState = initialState, action) {
  switch (action.type) {
    case RestaurantActions.SET_RESTAURANT_ID: {
      return { ...state, restaurantId: action.payload };
    }
  }

  return state;
}
