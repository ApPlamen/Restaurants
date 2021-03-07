import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileModel } from '../models/profile.model';
import { ChangePasswordModel } from '../models/change-password.model';
import { environment } from 'src/environments/environment';

const CONTROLER_URL = 'User';
const BASE_URL = environment.apiUrl + CONTROLER_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    return this.http.get(BASE_URL + '/profile');
  }

  saveUserProfile(profileModel: ProfileModel): Observable<any> {
    return this.http.post(BASE_URL, profileModel);
  }

  changePasswordUser(model: ChangePasswordModel): Observable<any> {
    return this.http.put(BASE_URL + '/change-password', model);
  }

  getUserBoard(): Observable<any> {
    return this.http.get(BASE_URL);
  }
}