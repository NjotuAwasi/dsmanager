import { Injectable } from '@angular/core';
import { Instructor } from '../models/instructor';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private baseUrl = 'http://localhost:8080/instructors';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private instructor: Instructor;
  constructor(private data: HttpClient) { }

  getInstructors() {
    return this.data.get<Instructor[]>(this.baseUrl + '/instructors');
  }

  countInstructors(id: number) {
    return this.data.get(this.baseUrl + '/count/branch/' + id);
  }

  countInstructorsBySchool(id: number) {
    return this.data.get<number>(this.baseUrl + '/count/' + id);
  }

  getInstructorsBySchool(id: number) {
    return this.data.get<Instructor[]>(this.baseUrl + '/school/' + id);
  }

  getInstructor(id: number) {
    return this.data.get<Instructor>(this.baseUrl + '/instructor/' + id);
  }

  deleteInstructor(id: number) {
    return this.data.delete<Instructor>(this.baseUrl + '/instructors/' + id);
  }

  addInstructor(instructor: Instructor) {
    return this.data.post<Instructor>(this.baseUrl + '/instructors', JSON.stringify(instructor), {headers: this.headers});
  }
  updateInstructor(instructor: Instructor) {
    return this.data.put<Instructor>(this.baseUrl + '/instructors', JSON.stringify(instructor), {headers: this.headers});
  }
}
