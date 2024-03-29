import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewOrderModel } from '../models/new-order.model copy';
import { CodeViewModel } from '../viewmodels/code.viewmodel';
import { JoinOrderModel } from '../models/join-order.model';
import { MenuItemOrderViewModel } from '../viewmodels/menu-item-order.viewmodel';
import { PriceViewModel } from '../viewmodels/price.viewmodel';
import { OrderedMenuItemViewModel } from '../viewmodels/ordered-menu-item.viewmodel copy';

const CONTROLER_URL = 'Order';
const BASE_URL = environment.apiUrl + CONTROLER_URL;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  startOrder(model: NewOrderModel): Observable<CodeViewModel> {
    return this.http.post<CodeViewModel>(BASE_URL + '/start-order', model);
  }

  joinOrder(orderId: JoinOrderModel): Observable<void> {
    return this.http.post<void>(BASE_URL + '/join-order', orderId);
  }

  getActiceOrder(): Observable<CodeViewModel> {
    return this.http.get<CodeViewModel>(BASE_URL + '/get-active-order');
  }

  getMenuBoard(): Observable<MenuItemOrderViewModel[]> {
    return this.http.get<MenuItemOrderViewModel[]>(BASE_URL + '/menu');
  }

  getMenuPricesBoard(menuItemId: string): Observable<PriceViewModel[]> {
    return this.http.get<PriceViewModel[]>(environment.apiUrl + 'MenuPrice' + '/menuItem/' + menuItemId + '/prices');
  }

  addItemToOrder(itemId: string): Observable<void> {
    return this.http.post<void>(BASE_URL + '/add-item-to-order', { id: itemId });
  }

  getOrderedItemsBoard(): Observable<OrderedMenuItemViewModel[]> {
    return this.http.get<OrderedMenuItemViewModel[]>(BASE_URL + '/ordered-items');
  }
}
