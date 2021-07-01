import { Action } from '@ngrx/store';

export const SET_MENU_ITEM_ID = '[MENU_ITEM_STORE] Set Menu Item Id';

export class SetMenuItemId implements Action {
  readonly type = SET_MENU_ITEM_ID;
  constructor(public payload: string) {}
}

export type OrderActions = SetMenuItemId;
