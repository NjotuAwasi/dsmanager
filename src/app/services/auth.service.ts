import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = "http://localhost:8080/users/login/";
  constructor(private httpClient: HttpClient,
    private router: Router) { }

  loginUser(login, password){
    return this.httpClient.get<any>(this.loginUrl + login + '/' + password);
  }

  loginUserbypassword(login, password){
    return this.httpClient.get<User>(this.loginUrl + 'login/' + login + '/' + password);
  }

  loggedIn(){
    return !!sessionStorage.getItem('token');
  }

  logout(){
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
