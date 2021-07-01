import * as CompanyActions from './company.store.action';
import { CompanyState, initialState } from './company.store.state';

export function companyRecuder(state: CompanyState = initialState, action) {
  switch (action.type) {
    case CompanyActions.SET_COMPANY_ID: {
      return { ...state, companyId: action.payload };
    }
  }

  return state;
}
