import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderBoardViewModel } from '../viewmodels/order-board.viewmodel';
import { OrderedMenuItemManagementBoard } from '../viewmodels/ordered-menu-items-board.viewmodel';

const CONTROLER_URL = 'OrderManagement';
const BASE_URL = environment.apiUrl + CONTROLER_URL;

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {
  constructor(private http: HttpClient) { }

  getRestaurantOrders(restaurantId: string): Observable<OrderBoardViewModel[]> {
    return this.http.get<OrderBoardViewModel[]>(BASE_URL + '/restaurant/' + restaurantId + '/restaurant-orders');
  }

  getOrderedMenuItems(restaurantId: string): Observable<OrderedMenuItemManagementBoard[]> {
    return this.http.get<OrderedMenuItemManagementBoard[]>(BASE_URL + '/restaurant/' + restaurantId + '/ordered-menu-items');
  }
}
