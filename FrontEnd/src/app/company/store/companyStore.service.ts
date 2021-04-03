import * as CompanyActions from './companyStore.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CompanyState, getCompanyId } from './companyStore.state';

@Injectable({
  providedIn: 'root'
})
export class CompanyStoreService {
  constructor(private companyStore: Store<CompanyState>) { }

  public get getCompanyId$(): Observable<string> {
    return this.companyStore.select(getCompanyId);
  }

  public set setCompanyId(companyId: string) {
    this.companyStore.dispatch( new CompanyActions.SetCompanyId(companyId) );
  }
}
