import * as SharedActions from './sharedStore.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedState, getManageRoles } from './sharedStore.state';
import { ManageRolesStoreModel } from '../storemodels/manage-roles.storemodel';

@Injectable({
  providedIn: 'root'
})
export class SharedStoreService {
  constructor(private sharedStore: Store<SharedState>) { }

  public get getManageRoles$(): Observable<ManageRolesStoreModel> {
    return this.sharedStore.select(getManageRoles);
  }

  public set setManageRoles(manageRoles: ManageRolesStoreModel) {
    this.sharedStore.dispatch( new SharedActions.SetManageRoles(manageRoles) );
  }
}
