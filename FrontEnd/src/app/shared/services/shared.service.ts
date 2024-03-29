import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserViewModel } from '../viewmodels/user.viewmodel';
import { UserRoleRequestModel } from '../models/user-role-request.model';
import { AssignUserRoleModel } from '../models/assign-user-role.model';
import { UnassignUserRoleModel } from '../models/unassign-user-role.model';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private http: HttpClient) { }

  addUserRole(model: AssignUserRoleModel): Observable<unknown> {
    return this.http.post(BASE_URL + 'UserRoles/assign-role', model);
  }

  removeUserRole(model: UnassignUserRoleModel): Observable<unknown> {
    return this.http.post(BASE_URL + 'UserRoles/unassign-role', model);
  }

  getUsersOfRole(userRoleRequestModel: UserRoleRequestModel): Observable<UserViewModel[]> {
    return this.http.post<UserViewModel[]>(BASE_URL + 'UserRoles/users', userRoleRequestModel);
  }
}
