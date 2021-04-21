import * as MenuManagementActions from './menuManagementStore.action';
import { MenuManagementState, initialState } from './menuManagement.state';

export function menuManagementRecuder(state: MenuManagementState = initialState, action) {
  switch (action.type) {
    case MenuManagementActions.SET_MENU_ITEM_ID: {
      return { ...state, menuItemId: action.payload };
    }
  }

  return state;
}
