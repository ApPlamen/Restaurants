import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface OrderState {
  menuItemId: string;
}

export const initialState: OrderState = {
  menuItemId: undefined,
};

const getOrderFeatureState = createFeatureSelector<OrderState>('order');

export const getMenuItemId = createSelector(
  getOrderFeatureState,
  state => state.menuItemId,
);
