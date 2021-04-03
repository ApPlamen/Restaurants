import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyModel } from '../models/company.model';
import { CompanyViewModel } from '../viewmodels/company.viewmodel';

const CONTROLER_URL = 'Company';
const BASE_URL = environment.apiUrl + CONTROLER_URL;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) { }

  getCompany(companyId: string): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(BASE_URL + '/' + companyId);
  }

  saveCompany(profileModel: CompanyModel): Observable<any> {
    return this.http.post(BASE_URL, profileModel);
  }

  getCompanyBoard(): Observable<CompanyViewModel> {
    return this.http.get<CompanyViewModel>(BASE_URL);
  }
}