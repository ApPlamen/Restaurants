import * as OrderActions from './order.store.action';
import { OrderState, initialState } from './order.store.state';

export function orderRecuder(state: OrderState = initialState, action) {
  switch (action.type) {
    case OrderActions.SET_MENU_ITEM_ID: {
      return { ...state, menuItemId: action.payload };
    }
  }

  return state;
}
