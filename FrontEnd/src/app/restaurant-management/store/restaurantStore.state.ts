import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/store.state';

export interface RestaurantState extends AppState {
  restaurantId: string;
}

export const initialState: RestaurantState = {
  restaurantId: null,
};

const getRestaurantFeatureState = createFeatureSelector<RestaurantState>('restaurant');

export const getRestaurantId = createSelector(
  getRestaurantFeatureState,
  state => state.restaurantId
);
