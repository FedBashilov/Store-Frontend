import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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

    let items = this.getItems();

    for (let i = 0; i < items.length; i++) {
      if (items[i].id == id) {
        items[i].amount++;
        localStorage.setItem("cartItems", JSON.stringify(items));
        return;
      }
    }

    items.push( new CartItem(id, name, price, 1));
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  deleteFromCart(id){
    this.cartCounterSubject.next(--this.counter);
    let items = this.getItems();

    for (let i = 0; i < items.length; i++) {
      if (items[i].id == id) {
        items[i].amount--;

        if (items[i].amount == 0) {
          items.splice(i, 1);
        }

        localStorage.setItem("cartItems", JSON.stringify(items));
        return;
      }
    }

  }

  getItems(){
    let items: CartItem[] = [];
    let data: CartItem[];
    data = JSON.parse(localStorage.getItem("cartItems"));
    if (data) {
      items = data;
    }

    return items;
  }

  getTotalPrice(): number{
    let items = this.getItems();
    let totalPrice: number = 0;

    items.forEach(item => {
      totalPrice += item.price*item.amount;
    });

    return totalPrice;
  }

  clearCart(){
    localStorage.removeItem("cartItems");
    this.cartCounterSubject.next(this.counter=0);
    return;
  }
}
