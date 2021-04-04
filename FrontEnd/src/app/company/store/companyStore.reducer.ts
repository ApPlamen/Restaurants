import * as CompanyActions from './companyStore.action';
import { CompanyState, initialState } from './companyStore.state';

export function companyRecuder(state: CompanyState = initialState, action) {
  switch (action.type) {
    case CompanyActions.SET_COMPANY_ID: {
      return { ...state, companyId: action.payload };
    }
  }

  return state;
}
