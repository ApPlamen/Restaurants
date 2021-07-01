import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PriceViewModel } from '../viewmodels/price.viewmodel';
import { PriceModel } from '../models/price.model';

const CONTROLER_URL = 'MenuPrice';
const BASE_URL = environment.apiUrl + CONTROLER_URL;

@Injectable({
  providedIn: 'root'
})
export class MenuPricesManagementService {
  constructor(private http: HttpClient) { }

  getMenuItemPrice(id: string): Observable<PriceModel> {
    return this.http.get<PriceModel>(BASE_URL + '/' + id);
  }

  saveMenuItemPrice(model: PriceModel): Observable<void> {
    return this.http.post<void>(BASE_URL, model);
  }

  getMenuPricesBoard(menuItemId: string): Observable<PriceViewModel[]> {
    return this.http.get<PriceViewModel[]>(BASE_URL + '/menuItem/' + menuItemId + '/prices');
  }

  deleteMenuItemPrice(id: string): Observable<void> {
    return this.http.delete<void>(BASE_URL + '/' + id);
  }
}
