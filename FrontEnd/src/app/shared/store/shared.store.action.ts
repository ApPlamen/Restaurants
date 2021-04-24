import { Action } from '@ngrx/store';
import { ManageRolesStoreModel } from '../storemodels/manage-roles.storemodel';

export const SET_SHARED_ID = '[SHARED] Set Manage Roles';

export class SetManageRoles implements Action {
  readonly type = SET_SHARED_ID;
  constructor(public payload: ManageRolesStoreModel) {}
}

export type SharedActions = SetManageRoles;
