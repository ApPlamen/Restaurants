import * as MenuManagementActions from './menuManagementStore.action';
import { MenuManagementState, initialState } from './menuManagementStore.state';

export function menuManagementRecuder(state: MenuManagementState = initialState, action) {
  switch (action.type) {
    case MenuManagementActions.SET_MENU_ITEM_ID: {
      return { ...state, menuItemId: action.payload };
    }

    case MenuManagementActions.SET_RESTAURANT_ID: {
      return { ...state, restaurantId: action.payload };
    }
  }

  return state;
}
