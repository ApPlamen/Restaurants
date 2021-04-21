import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface MenuManagementState {
  menuItemId: string;
}

export const initialState: MenuManagementState = {
  menuItemId: undefined,
};

const getMenuManagementFeatureState = createFeatureSelector<MenuManagementState>('menu-management');

export const getMenuItemId = createSelector(
  getMenuManagementFeatureState,
  state => state.menuItemId
);
