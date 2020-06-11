import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Schooladministrator } from '../models/schooladministrator';

@Injectable({
  providedIn: 'root'
})
export class SchooladministratorService {

  private baseUrl = 'http://localhost:8080/schooladministrators';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private schooladministrator: Schooladministrator;

  constructor(private data: HttpClient) { }

  addSchoolAdministrator(schooladministrator: Schooladministrator) {
    return this.data.post<Schooladministrator>(this.baseUrl + '/schooladministrator', JSON.stringify(schooladministrator), {headers: this.headers});
  }
}
