import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ManageRolesModel } from '../models/manage-roles.store-model';

export interface SharedState {
  manageRoles: ManageRolesModel;
}

export const initialState: SharedState = {
  manageRoles: undefined,
};

const getSharedFeatureState = createFeatureSelector<SharedState>('shared');

export const getManageRoles = createSelector(
  getSharedFeatureState,
  state => state.manageRoles
);
