import * as MenuManagementActions from './menu-management.store.action';
import { MenuManagementState, initialState } from './menu-management.store.state';

export function menuManagementRecuder(state: MenuManagementState = initialState, action) {
  switch (action.type) {
    case MenuManagementActions.SET_MENU_ITEM_ID: {
      return { ...state, menuItemId: action.payload };
    }

    case MenuManagementActions.SET_RESTAURANT_ID: {
      return { ...state, restaurantId: action.payload };
    }

    case MenuManagementActions.SET_PRICE_ID: {
      return { ...state, priceId: action.payload };
    }
  }

  return state;
}
