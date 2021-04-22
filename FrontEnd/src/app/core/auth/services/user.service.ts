import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileModel } from '../models/profile.model';
import { ChangePasswordModel } from '../models/change-password.model';
import { environment } from 'src/environments/environment';
import { UsersViewModel } from '../viewmodels/user.viewmodel';

const CONTROLER_URL = 'User';
const BASE_URL = environment.apiUrl + CONTROLER_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(BASE_URL + '/profile');
  }

  saveUserProfile(model: ProfileModel): Observable<void>  {
    return this.http.post<void> (BASE_URL, model);
  }

  changePasswordUser(model: ChangePasswordModel): Observable<void>  {
    return this.http.put<void> (BASE_URL + '/change-password', model);
  }

  getUserBoard(): Observable<UsersViewModel[]> {
    return this.http.get<UsersViewModel[]>(BASE_URL);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(BASE_URL + '/' + userId);
  }
}
