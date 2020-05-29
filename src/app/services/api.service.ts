import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';

//Импорт сервиса авторизации
import { AuthService } from "./auth.service";
//Импорт классов-моделей
import { Product } from  './../models/product.model';
import { Order } from  './../models/order.model';
import { Client } from './../models/client.model';
import { Review } from './../models/review.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {   //Сервис для реализации API

  public PHP_API_SERVER = "http://localhost"; //Адрес сервера

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  //Метод для получения всех товаров
  getAllProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.PHP_API_SERVER}/API.php/products`);
  }

  //Метод для получения одного товара по id
  getProductById(id: number): Observable<Product>{
    return this.httpClient.get<Product>(`${this.PHP_API_SERVER}/API.php/products/${id}`);
  }

  //Метод для получения массива id товаров, которые купил пользователь
  getProductsBoughtByClient(): Observable<number[]>{
    let jwt = this.authService.getJWT();  //Получение JWT токена текущего пользователя
    let headers = new HttpHeaders().set('JWT', `${jwt}`); //Добавление JWT в заголовки запроса
    return this.httpClient.get<number[]>(`${this.PHP_API_SERVER}/API.php/products/boughtByClient`, {headers: headers});
  }

  //Метод для оформления нового заказа
  postOrder(newOrder: Order): Observable<number>{
    let jwt = this.authService.getJWT(); //Получение JWT токена текущего пользователя
    let headers = new HttpHeaders().set('JWT', `${jwt}`); //Добавление JWT в заголовки запроса
    return this.httpClient.post<number>(`${this.PHP_API_SERVER}/API.php/orders`, {data: newOrder}, {headers: headers} );
  }

  //Метод для получения отзывов товара по его id
  getReviewsOfProduct(product_id: number): Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${this.PHP_API_SERVER}/API.php/reviews/of-product/${product_id}`);
  }

  //Метод для отправки нового отзыва
  postReview(newReview: Review): Observable<number>{
    let jwt = this.authService.getJWT();  //Получение JWT токена текущего пользователя
    let headers = new HttpHeaders().set('JWT', `${jwt}`); //Добавление JWT в заголовки запроса
    return this.httpClient.post<number>(`${this.PHP_API_SERVER}/API.php/reviews`, {data: newReview}, {headers: headers} );
  }

  //Метод для редактирования отзыва
  putReview(newReview: Review): Observable<number>{
    let jwt = this.authService.getJWT();  //Получение JWT токена текущего пользователя
    let headers = new HttpHeaders().set('JWT', `${jwt}`); //Добавление JWT в заголовки запроса
    return this.httpClient.put<number>(`${this.PHP_API_SERVER}/API.php/reviews`, {data: newReview}, {headers: headers} );
  }

  //Метод для удаления отзыва
  deleteReview(productId: number): Observable<string>{
    let jwt = this.authService.getJWT();  //Получение JWT токена текущего пользователя
    let headers = new HttpHeaders().set('JWT', `${jwt}`); //Добавление JWT в заголовки запроса
    return this.httpClient.delete<string>(`${this.PHP_API_SERVER}/API.php/reviews/${productId}`, {headers: headers} );
  }

  //Метод для редактирования информации о пользователе
  updateClient(client: Client): Observable<string>{
    let jwt = this.authService.getJWT();  //Получение JWT токена текущего пользователя
    let headers = new HttpHeaders().set('JWT', `${jwt}`); //Добавление JWT в заголовки запроса
    return this.httpClient.put<string>(`${this.PHP_API_SERVER}/API.php/clients`, {data: client}, {headers: headers} );
  }

}
