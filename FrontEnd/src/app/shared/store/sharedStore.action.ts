import { Action } from '@ngrx/store';
import { ManageRolesModel } from '../models/manage-roles.store-model';

export const SET_SHARED_ID = '[SHARED] Set Manage Roles';

export class SetManageRoles implements Action {
  readonly type = SET_SHARED_ID;
  constructor(public payload: ManageRolesModel) {}
}

export type SharedActions = SetManageRoles;
