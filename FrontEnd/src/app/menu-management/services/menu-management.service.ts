import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuItemViewModel } from '../viewmodels/menu-item.viewmodel';
import { MenuItemModel } from '../models/menu-item.model';
import { AvailableModel } from 'src/app/shared/models/available.model';

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

  getMenuBoard(restaurantId: string): Observable<MenuItemViewModel[]> {
    return this.http.get<MenuItemViewModel[]>(BASE_URL + '/restaurant/' + restaurantId + '/menu');
  }

  deleteMenuItem(menuItemId: string): Observable<void> {
    return this.http.delete<void>(BASE_URL + '/' + menuItemId);
  }

  toggleMenuItemAvailable(model: AvailableModel): Observable<void> {
    return this.http.put<void>(BASE_URL + '/available', model);
  }

  getRestaurantUserRoles(restaurantId: string): Observable<string[]> {
    return this.http.get<string[]>(BASE_URL + '/restaurant/' + restaurantId + '/user-roles');
  }

  canActivate(restaurantId: string): Observable<boolean> {
    return this.http.get<boolean>(BASE_URL + '/restaurant/' + restaurantId + '/canActivate');
  }
}
