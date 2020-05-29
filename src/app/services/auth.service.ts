import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
//Импорт класса-модели
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {  //Сервис авторизации

  //Отслеживаемый объект текущего пользователя
  private currentClientSubject = new BehaviorSubject<Client>( new Client );
  public currentClient = this.currentClientSubject.asObservable();
  public client: Client = new Client;

  public PHP_API_SERVER = "http://localhost"; //Адрес сервера

  constructor(private httpClient: HttpClient) {
    //Объявление текущего пользователя
    let client: Client = JSON.parse(localStorage.getItem("current_client"));
    if(client){
      this.currentClientSubject.next(client);
    }
  }

  //Метод для получение текущего JWT токена
  getJWT(){
    return localStorage.getItem("jwt");
  }

  //Метод для входа пользователя
  login(email, password): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/API.php/clients/login`, {data: { email: email, password: password }});
  }

  //Метод для установки текущего пользователя
  setCurrentClient(jwt: string){
    localStorage.setItem("jwt", jwt); //Устанавливаем новый JWT
    //Получение и установка информации о текущем пользователе
    this.getClientInfo().subscribe( (client: Client) => {
      this.currentClientSubject.next(client);
      localStorage.setItem("current_client",  JSON.stringify(client));
    });
  }

  //Метод для выхода пользователя из аккаунта
  logout(){
    localStorage.removeItem("current_client");
    localStorage.removeItem("jwt");
    this.currentClientSubject.next(new Client);
  }

  //Метод для регистрации нового пользователя
  registration(newClient: Client): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/API.php/clients`, {data: newClient});
  }

  //Метод для получения информации о текущем пользователе
  getClientInfo(): Observable<Client>{
    let jwt = this.getJWT(); //Получение JWT токена текущего пользователя
    let headers = new HttpHeaders().set('JWT', `${jwt}`); //Добавление JWT в заголовки запроса
    return this.httpClient.get<Client>(`${this.PHP_API_SERVER}/API.php/clients`, {headers: headers} );
  }

}
