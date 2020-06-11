import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8080/courses';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private course: Course;

  constructor(private data: HttpClient) { }

  getCourses() {
    return this.data.get<Course[]>(this.baseUrl + '/courses');
  }

  getCoursesBySchool(id: number) {
    return this.data.get<Course[]>(this.baseUrl + '/courses/' + id);
  }
  getCourse(id: number) {
    return this.data.get<Course>(this.baseUrl + '/course/' + id);
  }

  deleteCourse(id: number) {
    return this.data.delete<Course>(this.baseUrl + '/courses/' + id);
  }

  addCourse(course: Course, id: number, user: number) {
    return this.data.post<Course>(this.baseUrl + '/courses/' + id + '/' + user, JSON.stringify(course), {headers: this.headers});
  }
  updateCourse(course: Course, id: number) {
    return this.data.put<Course>(this.baseUrl + '/courses', JSON.stringify(course), {headers: this.headers});
  }
}
