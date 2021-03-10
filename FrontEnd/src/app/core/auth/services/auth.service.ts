import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogInModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { environment } from 'src/environments/environment';

const CONTROLER_URL = 'Account';
const BASE_URL = environment.apiUrl + CONTROLER_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(logInModel: LogInModel): Observable<any> {
    return this.http.post(BASE_URL + '/login', logInModel);
  }

  register(registerModel: RegisterModel): Observable<any> {
    return this.http.post(BASE_URL + '/register', registerModel);
  }
}