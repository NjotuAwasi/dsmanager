import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private baseUrl = 'http://localhost:8080/schedules';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private schedule: Schedule;

  constructor(private data: HttpClient) { }

  getSchedules() {
    return this.data.get<Schedule[]>(this.baseUrl + '/schedules');
  }

  countScheduleBySchool(id: number) {
    return this.data.get<number>(this.baseUrl + '/count/' + id);
  }

  getSchedulesBySchool(id: number) {
    return this.data.get<Schedule[]>(this.baseUrl + '/school/' + id);
  }

  getSchedule(id: number) {
    return this.data.get<Schedule>(this.baseUrl + '/schedules/' + id);
  }

  deleteSchedule(id: number) {
    return this.data.delete<Schedule>(this.baseUrl + '/schedules/' + id);
  }

  addSchedule(schedule: Schedule) {
    return this.data.post<Schedule>(this.baseUrl + '/students', JSON.stringify(schedule), {headers: this.headers});
  }
  updateSchedule(schedule: Schedule) {
    return this.data.put<Schedule>(this.baseUrl + '/students', JSON.stringify(schedule), {headers: this.headers});
  }
}
