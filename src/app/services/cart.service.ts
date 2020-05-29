import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
//Импорт классов-моделей
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {  //Сервис для корзины пользователя

  //Отслеживаемый счетчик количества товаров в корзине
  private cartCounterSubject = new BehaviorSubject<number>(this.setCartCounter());
  public cartCounter = this.cartCounterSubject.asObservable();
  public counter: number;

  //Метод для установки счетчика товаров
  setCartCounter(): number{
    let items = this.getItems();
    this.counter = 0;
    items.forEach(item => {
      this.counter += item.amount;
    });
    return this.counter;
  }

  //Метод для добавления товара в корзину
  addToCart(product: Product){
    this.cartCounterSubject.next(++this.counter);

    let items = this.getItems();

    for (let i = 0; i < items.length; i++) {
      if (items[i].id == product.id) {
        items[i].amount++;
        localStorage.setItem("cartItems", JSON.stringify(items));
        return;
      }
    }

    items.push( new CartItem(product, 1) );
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  //Метод для удаления товара из корзины
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

  //Метод для получения товаров в корзине
  getItems(){
    let items: CartItem[] = [];
    let data: CartItem[];
    data = JSON.parse(localStorage.getItem("cartItems"));
    if (data) {
      items = data;
    }

    return items;
  }

  //Метод для получения общей стоимости всех товаров в корзине
  getTotalPrice(): number{
    let items = this.getItems();
    let totalPrice: number = 0;

    items.forEach(item => {
      totalPrice += item.price*item.amount;
    });

    return totalPrice;
  }

  //Метод для очистки корзины
  clearCart(){
    localStorage.removeItem("cartItems");
    this.cartCounterSubject.next(this.counter=0);
    return;
  }
}
