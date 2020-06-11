import { Injectable } from '@angular/core';
import { Session } from '../models/session';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl = 'http://localhost:8080/sessions';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  public sessions: Session;


  constructor(private data: HttpClient) { }

  getSessions() {
    return this.data.get<Session[]>(this.baseUrl + '/sessions');
  }

  getSessionsBySchool(id: number) {
    return this.data.get<Session[]>(this.baseUrl + '/sessions/' + id);
  }
  getSession(id: number) {
    return this.data.get<Session>(this.baseUrl + '/session/' + id);
  }

  deleteSession(id: number) {
    return this.data.delete<Session>(this.baseUrl + '/sessions/' + id);
  }

  addSession(sessions: Session, id: number, user: number) {
    return this.data.post<Session>(this.baseUrl + '/sessions/' + id + '/' + user, JSON.stringify(sessions), {headers: this.headers});
  }
  updateSessions(sessions: Session, id: number) {
    return this.data.put<Session>(this.baseUrl + '/sessions', JSON.stringify(sessions), {headers: this.headers});
  }
}
