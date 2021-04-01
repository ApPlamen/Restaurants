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

  getRestaurant(): Observable<RestaurantModel> {
    return this.http.get<RestaurantModel>(BASE_URL + '/profile');
  }

  saveRestaurant(profileModel: RestaurantModel): Observable<any> {
    return this.http.post(BASE_URL, profileModel);
  }

  getRestaurantBoard(): Observable<RestaurantViewModel> {
    return this.http.get<RestaurantViewModel>(BASE_URL);
  }
}
