import { Action } from '@ngrx/store';

export const SET_RESTAURANT_ID = '[RESTAURANT_STORE] Set Restaurant Id';

export class SetRestaurantId implements Action {
  readonly type = SET_RESTAURANT_ID;
  constructor(public payload: string) {}
}

export type RestaurantActions = SetRestaurantId;
