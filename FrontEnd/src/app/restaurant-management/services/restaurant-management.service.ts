import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestaurantModel } from '../models/restaurant.model';
import { RestaurantViewModel } from '../viewmodels/restaurant.viewmodel';

const CONTROLER_URL = 'Restaurant';
const BASE_URL = environment.apiUrl + CONTROLER_URL;

@Injectable({
  providedIn: 'root'
})
export class RestaurantManagementService {
  constructor(private http: HttpClient) { }

  getRestaurant(restaurantId: string): Observable<RestaurantModel> {
    return this.http.get<RestaurantModel>(BASE_URL + '/' + restaurantId);
  }

  saveRestaurant(model: RestaurantModel): Observable<void> {
    return this.http.post<void>(BASE_URL, model);
  }

  getRestaurantBoard(): Observable<RestaurantViewModel> {
    return this.http.get<RestaurantViewModel>(BASE_URL);
  }

  deleteRestaurant(restaurantId: string): Observable<void> {
    return this.http.delete<void>(BASE_URL + '/' + restaurantId);
  }
}
