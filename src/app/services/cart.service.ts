import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];

  private cartCounterSubject = new BehaviorSubject<number>(this.setCartCounter());
  cartCounter = this.cartCounterSubject.asObservable();
  counter: number;


  setCartCounter(): number{
    let items = this.getItems();
    this.counter = 0;
    items.forEach(item => {
      this.counter += item.amount;
    });
    return this.counter;
  }

  addToCart(id, name, price){
    this.cartCounterSubject.next(++this.counter);

    let item = JSON.parse(localStorage.getItem(id));
      if(item != null){
        item.amount++;
        let serialData = JSON.stringify(item);
        localStorage.removeItem(id);
        localStorage.setItem(id, serialData);
      } else{
        let data = {
          name: name,
          price: price,
          amount: 1
        };
        let serialData = JSON.stringify(data);
        localStorage.setItem(id, serialData);
      }
  }

  deleteFromCart(id){
    this.cartCounterSubject.next(--this.counter);

    let item = JSON.parse(localStorage.getItem(id));
      if(item.amount > 1){
        item.amount--;
        let serialData = JSON.stringify(item);
        localStorage.removeItem(id);
        localStorage.setItem(id, serialData);
      } else{
        localStorage.removeItem(id);
      }
  }

  getItems(){
    let items: CartItem[] = [];
    let bufItem: CartItem;
    Object.keys(localStorage).forEach((key) => {
      if(key != 'jwt'){
        bufItem = new CartItem;
        bufItem = JSON.parse(localStorage.getItem(key));
        bufItem.id = parseInt(key);
        items.push(bufItem);
      }
    });
    return items;
  }

  getTotalPrice(): number{
    let totalPrice: number = 0;
    let data;
    Object.keys(localStorage).forEach((key) => {
      if(key != 'jwt'){
        data = JSON.parse(localStorage.getItem(key));
        totalPrice += data.price*data.amount;
      }
    });
    return totalPrice;
  }

  clearCart(){
    localStorage.clear();
    this.cartCounterSubject.next(this.counter=0);
    return;
  }
}
