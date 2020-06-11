import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { School } from '../models/school';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private baseUrl = 'http://localhost:8080/schools';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private school: School;

  constructor(private data: HttpClient) { }

  addSchool(school: School) {
    return this.data.post<School>(this.baseUrl + '/school', JSON.stringify(school), {headers: this.headers});
  }
  getSchool(id: number) {
    return this.data.get<School>(this.baseUrl + '/school/' + id);
  }
  getSchools(){
    return this.data.get<School[]>(this.baseUrl + '/schools');
  }
}
