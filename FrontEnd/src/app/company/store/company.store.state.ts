import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface CompanyState {
  companyId: string;
}

export const initialState: CompanyState = {
  companyId: undefined,
};

const getCompanyFeatureState = createFeatureSelector<CompanyState>('company');

export const getCompanyId = createSelector(
  getCompanyFeatureState,
  state => state.companyId
);
