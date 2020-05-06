import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';

import { Product } from  './../models/product.model';
import { Order } from  './../models/order.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) {}

  getAllProductsId(): Observable<number[]>{
    return this.httpClient.get<number[]>(`${this.PHP_API_SERVER}/API.php/products`);
  }

  getProductById(id: number): Observable<Product>{
    return this.httpClient.get<Product>(`${this.PHP_API_SERVER}/API.php/products/${id}`);
  }

  postOrder(newOrder: Order): Observable<number>{
    return this.httpClient.post<number>(`${this.PHP_API_SERVER}/API.php/orders`, {data: newOrder} );
  }

  getUserInfo(jwt): Observable<User>{
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.get<User>(`${this.PHP_API_SERVER}/API.php/user`, {headers: headers} );
  }

}
