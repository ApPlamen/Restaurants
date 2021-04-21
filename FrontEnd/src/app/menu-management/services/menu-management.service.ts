import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuItemViewModel } from '../viewmodels/menu-item.viewmodel';
import { MenuItemModel } from '../models/menu-management.model';

const CONTROLER_URL = 'MenuManagement';
const BASE_URL = environment.apiUrl + CONTROLER_URL;

@Injectable({
  providedIn: 'root'
})
export class MenuManagementService {
  constructor(private http: HttpClient) { }

  getMenuItem(menuItemId: string): Observable<MenuItemModel> {
    return this.http.get<MenuItemModel>(BASE_URL + '/' + menuItemId);
  }

  saveMenuItem(model: MenuItemModel): Observable<void> {
    return this.http.post<void>(BASE_URL, model);
  }

  getMenuBoard(restaurantId: string): Observable<MenuItemViewModel> {
    return this.http.get<MenuItemViewModel>(BASE_URL + '/restaurant/' + restaurantId + '/menu');
  }

  deleteMenuItem(menuItemId: string): Observable<void> {
    return this.http.delete<void>(BASE_URL + '/' + menuItemId);
  }

  canActivate(restaurantId: string): Observable<boolean> {
    return this.http.get<boolean>(BASE_URL + '/restaurant/' + restaurantId + '/canActivate');
  }
}
