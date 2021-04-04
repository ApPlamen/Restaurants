import { Action } from '@ngrx/store';

export const SET_COMPANY_ID = '[COMPANY_STORE] Set Company Id';

export class SetCompanyId implements Action {
  readonly type = SET_COMPANY_ID;
  constructor(public payload: string) {}
}

export type CompanyActions = SetCompanyId;
