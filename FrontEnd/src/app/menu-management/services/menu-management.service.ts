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

  // getRestaurant(restaurantId: string): Observable<RestaurantModel> {
  //   return this.http.get<RestaurantModel>(BASE_URL + '/' + restaurantId);
  // }

  // saveMenuItem(profileModel: RestaurantModel): Observable<void> {
  //   return this.http.post<void>(BASE_URL, profileModel);
  // }

  // getMenuBoard(): Observable<RestaurantViewModel> {
  //   return this.http.get<RestaurantViewModel>(BASE_URL);
  // }

  // deleteRestaurant(restaurantId: string): Observable<void> {
  //   return this.http.delete<void>(BASE_URL + '/' + restaurantId);
  // }

  canActivate(restaurantId: string): Observable<boolean> {
    return this.http.get<boolean>(BASE_URL + '/restaurant/' + restaurantId + '/canActivate');
  }
}
