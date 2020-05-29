import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

//Импорт сервиса
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
//Компонент для иконки корзины
export class CartComponent implements OnInit, OnDestroy {
  //Отслеживаемый счетчик количества товаров в корзине
  private subscription: Subscription;
  public cartCounter: number;

  constructor( public cartService: CartService ) {
    //Установка счетчика товаров в корзине
    this.subscription = this.cartService.cartCounter.subscribe(cartCounter => { this.cartCounter = cartCounter; });
  }

  ngOnInit() {}

  ngOnDestroy(){
    //Отписка от отслеживаний
    this.subscription.unsubscribe();
  }


}
