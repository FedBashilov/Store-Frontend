import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public cartCounter: number;

  constructor( public cartService: CartService ) {
    this.subscription = this.cartService.cartCounter.subscribe(cartCounter => { this.cartCounter = cartCounter; });
  }

  ngOnInit() {}

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
