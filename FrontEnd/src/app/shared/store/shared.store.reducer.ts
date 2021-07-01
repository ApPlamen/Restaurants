import * as SharedActions from './shared.store.action';
import { SharedState, initialState } from './shared.store.state';

export function sharedRecuder(state: SharedState = initialState, action) {
  switch (action.type) {
    case SharedActions.SET_SHARED_ID: {
      return { ...state, manageRoles: action.payload };
    }
  }

  return state;
}
