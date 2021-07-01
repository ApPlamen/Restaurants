import { Action } from '@ngrx/store';

export const SET_MENU_ITEM_ID = '[MENU_ITEM_STORE] Set Menu Item Id';
export const SET_RESTAURANT_ID = '[MENU_ITEM_STORE] Set Restaurant Id';
export const SET_PRICE_ID = '[MENU_ITEM_STORE] Set Price Id';

export class SetMenuItemId implements Action {
  readonly type = SET_MENU_ITEM_ID;
  constructor(public payload: string) {}
}

export class SetRestaurantId implements Action {
  readonly type = SET_RESTAURANT_ID;
  constructor(public payload: string) {}
}

export class SetPriceId implements Action {
  readonly type = SET_PRICE_ID;
  constructor(public payload: string) {}
}

export type MenuManagementActions = SetMenuItemId
  | SetRestaurantId
  | SetPriceId;
