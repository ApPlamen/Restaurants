import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';
import { UserRoleRequestModel } from '../models/user-role-request.model';
import { AssignUserRoleModel } from '../models/assign-user-role.model';
import { UnassignUserRoleModel } from '../models/unassign-user-role.model';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private http: HttpClient) { }

  addUserRole(model: AssignUserRoleModel): Observable<object> {
    return this.http.post(BASE_URL + 'UserRoles/assign-role', model);
  }

  removeUserRole(model: UnassignUserRoleModel): Observable<object> {
    return this.http.post(BASE_URL + 'UserRoles/unassign-role', model);
  }

  getUsersOfRole(userRoleRequestModel: UserRoleRequestModel): Observable<UserModel> {
    return this.http.post<UserModel>(BASE_URL + 'UserRoles/users', userRoleRequestModel);
  }
}
