import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentClientSubject = new BehaviorSubject<Client>( new Client );
  currentClient = this.currentClientSubject.asObservable();
  client: Client = new Client;

  public PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) {
    let client: Client = JSON.parse(localStorage.getItem("current_client"));

    if(client){
      this.currentClientSubject.next(client);
    }
  }


  getJWT(){
    return localStorage.getItem("jwt");
  }


  login(email, password): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/API.php/login-client`, {data: { email: email, password: password }});
  }

  setCurrentClient(jwt: string){
    localStorage.setItem("jwt", jwt);
    this.getClientInfo().subscribe( (client: Client) => {
      this.currentClientSubject.next(client);
      localStorage.setItem("current_client",  JSON.stringify(client));
    });
  }

  logout(){
    localStorage.removeItem("current_client");
    localStorage.removeItem("jwt");
    this.currentClientSubject.next(new Client);
  }

  registration(newClient: Client): Observable<string>{
    return this.httpClient.post<string>(`${this.PHP_API_SERVER}/API.php/clients`, {data: newClient});
  }

  getClientInfo(): Observable<Client>{
    let jwt = this.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.get<Client>(`${this.PHP_API_SERVER}/API.php/clients`, {headers: headers} );
  }

}
