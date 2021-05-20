import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderBoardViewModel } from '../viewmodels/order-board.viewmodel';
import { OrderedMenuItemManagementBoard } from '../viewmodels/ordered-menu-items-board.viewmodel';
import { OrderedItemStatusModel } from '../models/ordered-item-status.model';

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

  setOrderedItemStatus(model: OrderedItemStatusModel): Observable<void> {
    return this.http.put<void>(environment.apiUrl + 'ItemOrderManagement/set-status', model);
  }

  canActivate(restaurantId: string): Observable<boolean> {
    return this.http.get<boolean>(BASE_URL + '/restaurant/' + restaurantId + '/canActivate');
  }
}
