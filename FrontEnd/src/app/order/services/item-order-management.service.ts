import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderedItemStatusModel } from '../models/ordered-item-status.model';

const CONTROLER_URL = 'ItemOrderManagement';
const BASE_URL = environment.apiUrl + CONTROLER_URL;

@Injectable({
  providedIn: 'root'
})
export class ItemOrderManagementService {
  constructor(private http: HttpClient) { }

  askToRemove(model: OrderedItemStatusModel): Observable<void> {
    return this.http.put<void>(BASE_URL + '/ask-remove', model);
  }
}
