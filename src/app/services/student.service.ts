import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:8080/students';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private student: Student;

  constructor(private data: HttpClient) { }

  getStudents() {
    return this.data.get<Student[]>(this.baseUrl + '/students');
  }

  countStudentsBySchool(id: number) {
    return this.data.get<number>(this.baseUrl + '/count/' + id);
  }

  getStudentsBySchool(id: number) {
    return this.data.get<Student[]>(this.baseUrl + '/school/' + id);
  }

  getReviewBySchool(id: number) {
    return this.data.get<Student[]>(this.baseUrl + '/review/' + id);
  }

  getStudentsBySchoolAndStatus(id: number, status:string) {
    return this.data.get<Student[]>(this.baseUrl + '/school/' + id + '/' + status);
  }

  countStudents(id: number) {
    return this.data.get(this.baseUrl + '/count/branch/' + id);
  }

  getStudent(id: number) {
    return this.data.get<Student>(this.baseUrl + '/students/' + id);
  }

  print() {
    return this.data.get(this.baseUrl + '/pdfreport');
  }

  getStudentByUser(id: number) {
    return this.data.get<Student>(this.baseUrl + '/studentuser/' + id);
  }

  deleteStudent(id: number) {
    return this.data.delete<Student>(this.baseUrl + '/students/' + id);
  }

  addStudent(student: Student) {
    return this.data.post<Student>(this.baseUrl + '/students', JSON.stringify(student), {headers: this.headers});
  }

  addStudentBySchool(student: Student, id: number) {
    return this.data.post<Student>(this.baseUrl + '/students/' + 1, JSON.stringify(student), {headers: this.headers});
  }

  updateStudent(student: Student) {
    return this.data.put<Student>(this.baseUrl + '/students', JSON.stringify(student), {headers: this.headers});
  }
  setter(student: Student) {
    this.student = student;
  }
  getter() {
    return this.student;
  }
}
