import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileModel } from '../models/profile.model';

const API_URL = 'http://localhost:5000/User/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    return this.http.get(API_URL + 'profile');
  }

  saveUserProfile(profileModel: ProfileModel): Observable<any> {
    return this.http.post(API_URL, profileModel);
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL);
  }
}