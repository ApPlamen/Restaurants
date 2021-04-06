import * as SharedActions from './sharedStore.action';
import { SharedState, initialState } from './sharedStore.state';

export function sharedRecuder(state: SharedState = initialState, action) {
  switch (action.type) {
    case SharedActions.SET_SHARED_ID: {
      return { ...state, manageRoles: action.payload };
    }
  }

  return state;
}
