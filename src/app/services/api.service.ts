import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';

import { AuthService } from "./auth.service";

import { Product } from  './../models/product.model';
import { Order } from  './../models/order.model';
import { Client } from './../models/client.model';
import { Review } from './../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getAllProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.PHP_API_SERVER}/API.php/products`);
  }

  getProductById(id: number): Observable<Product>{
    return this.httpClient.get<Product>(`${this.PHP_API_SERVER}/API.php/products/${id}`);
  }

  getProductsBoughtByClient(): Observable<number[]>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.get<number[]>(`${this.PHP_API_SERVER}/API.php/products/boughtByClient`, {headers: headers});
  }

  postOrder(newOrder: Order): Observable<number>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.post<number>(`${this.PHP_API_SERVER}/API.php/orders`, {data: newOrder}, {headers: headers} );
  }

  getReviewsOfProduct(product_id: number): Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${this.PHP_API_SERVER}/API.php/reviews/of-product/${product_id}`);
  }

  postReview(newReview: Review): Observable<number>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.post<number>(`${this.PHP_API_SERVER}/API.php/reviews`, {data: newReview}, {headers: headers} );
  }

  putReview(newReview: Review): Observable<number>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.put<number>(`${this.PHP_API_SERVER}/API.php/reviews`, {data: newReview}, {headers: headers} );
  }

  deleteReview(productId: number): Observable<string>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.delete<string>(`${this.PHP_API_SERVER}/API.php/reviews/${productId}`, {headers: headers} );
  }

  updateClient(client: Client): Observable<string>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.put<string>(`${this.PHP_API_SERVER}/API.php/clients`, {data: client}, {headers: headers} );
  }

}
