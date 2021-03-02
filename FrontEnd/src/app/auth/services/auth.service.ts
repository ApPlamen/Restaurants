import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogInModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';

const AUTH_API = 'http://localhost:5000/Account/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(logInModel: LogInModel): Observable<any> {
    return this.http.post(AUTH_API + 'login', logInModel, httpOptions);
  }

  register(registerModel: RegisterModel): Observable<any> {
    return this.http.post(AUTH_API + 'register', registerModel, httpOptions);
  }
}