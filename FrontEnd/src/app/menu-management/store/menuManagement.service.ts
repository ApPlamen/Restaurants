import * as MenuManagementActions from './menuManagementStore.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuManagementState, getMenuItemId } from './menuManagement.state';

@Injectable({
  providedIn: 'root'
})
export class MenuManagementStoreService {
  constructor(private menuManagementStore: Store<MenuManagementState>) { }

  public get getMenuItemId$(): Observable<string> {
    return this.menuManagementStore.select(getMenuItemId);
  }

  public set setMenuItemId(menuItemId: string) {
    this.menuManagementStore.dispatch( new MenuManagementActions.SetMenuItemId(menuItemId) );
  }
}
