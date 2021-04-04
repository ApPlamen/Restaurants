import * as RestaurantActions from './restaurantStore.action';
import { RestaurantState, initialState } from './restaurantStore.state';

export function restaurantRecuder(state: RestaurantState = initialState, action) {
  switch (action.type) {
    case RestaurantActions.SET_RESTAURANT_ID: {
      return { ...state, restaurantId: action.payload };
    }
  }

  return state;
}
