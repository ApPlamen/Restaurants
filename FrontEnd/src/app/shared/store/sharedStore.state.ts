import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ManageRolesStoreModel } from '../storemodels/manage-roles.storemodel';

export interface SharedState {
  manageRoles: ManageRolesStoreModel;
}

export const initialState: SharedState = {
  manageRoles: undefined,
};

const getSharedFeatureState = createFeatureSelector<SharedState>('shared');

export const getManageRoles = createSelector(
  getSharedFeatureState,
  state => state.manageRoles
);
