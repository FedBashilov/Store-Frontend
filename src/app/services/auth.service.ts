import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';


import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public PHP_API_SERVER = "https://webstorebash.000webhostapp.com";

  constructor(private httpClient: HttpClient) {
  }

  setJWT(jwt){
    localStorage.setItem("jwt", jwt);
  }

  getJWT(){
    return localStorage.getItem("jwt");
  }

  deleteJWT(){
    localStorage.removeItem("jwt");
  }

  login(email, password): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/API.php/login`, {data: { email: email, password: password }});
  }

  registration(newUser: User): Observable<string>{
    return this.httpClient.post<string>(`${this.PHP_API_SERVER}/API.php/user`, {data: newUser});
  }

}
