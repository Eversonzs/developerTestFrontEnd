import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getUserRoles(){
    return this.http.get(`${this.apiUrl}/userRol`)
  }
}
