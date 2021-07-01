import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface MenuManagementState {
  menuItemId: string;
  restaurantId: string;
  priceId: string;
}

export const initialState: MenuManagementState = {
  menuItemId: undefined,
  restaurantId: undefined,
  priceId: undefined,
};

const getMenuManagementFeatureState = createFeatureSelector<MenuManagementState>('menu-management');

export const getMenuItemId = createSelector(
  getMenuManagementFeatureState,
  state => state.menuItemId,
);

export const getRestaurantId = createSelector(
  getMenuManagementFeatureState,
  state => state.restaurantId,
);

export const getPriceId = createSelector(
  getMenuManagementFeatureState,
  state => state.priceId,
);
