import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/store.state';

export interface CompanyState extends AppState {
  companyId: string;
}

export const initialState: CompanyState = {
  companyId: null,
};

const getCompanyFeatureState = createFeatureSelector<CompanyState>('company');

export const getCompanyId = createSelector(
  getCompanyFeatureState,
  state => state.companyId
);
