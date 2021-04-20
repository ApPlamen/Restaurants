import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const CONTROLER_URL = 'MenuManagement';
const BASE_URL = environment.apiUrl + CONTROLER_URL;

@Injectable({
  providedIn: 'root'
})
export class MenuManagementService {
  constructor(private http: HttpClient) { }

  // getMenuItem(menuItemId: string): Observable<MenuItemModel> {
  //   return this.http.get<MenuItemModel>(BASE_URL + '/' + menuItemId);
  // }

  // saveMenuItem(profileModel: MenuItemModel): Observable<void> {
  //   return this.http.post<void>(BASE_URL, profileModel);
  // }

  // getMenuBoard(): Observable<MenuItemViewModel> {
  //   return this.http.get<MenuItemViewModel>(BASE_URL);
  // }

  // deleteMenuItem(menuItemId: string): Observable<void> {
  //   return this.http.delete<void>(BASE_URL + '/' + menuItemId);
  // }

  canActivate(restaurantId: string): Observable<boolean> {
    return this.http.get<boolean>(BASE_URL + '/restaurant/' + restaurantId + '/canActivate');
  }
}