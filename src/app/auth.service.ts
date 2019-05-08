import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token == null){
      return false;
    }else{
      return true;
      /* return !this.jwtHelper.isTokenExpired(token); */
    }
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userRol');
  }

  checkUserCredentials(user){
    let username = user.username;
    let password = user.password;
    return this.http.get(`${this.apiUrl}/userAuth?username=${username}&password=${password}`)
  }

}