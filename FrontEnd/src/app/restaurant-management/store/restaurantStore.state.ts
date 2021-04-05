import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RestaurantState {
  restaurantId: string;
}

export const initialState: RestaurantState = {
  restaurantId: undefined,
};

const getRestaurantFeatureState = createFeatureSelector<RestaurantState>('restaurant');

export const getRestaurantId = createSelector(
  getRestaurantFeatureState,
  state => state.restaurantId
);
