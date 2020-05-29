import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//Импорт компонента, отвечающего за модальное окно
import { SuccessfulOrderDialogComponent } from '../../components/successful-order-dialog/successful-order-dialog.component';
//Импорт сервисов
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
//Импорт классов-моделей
import { Client } from  './../../models/client.model';
import { Product } from  './../../models/product.model';
import { Order } from  './../../models/order.model';
import { OrderProduct } from  './../../models/order-product.model';



@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
//Компонент страницы "Корзина"
export class CartPageComponent implements OnInit, OnDestroy {

  public products = []; //Список товаров в корзине

  //Отслеживаемый счетчик товаров
  private subscriptionCart: Subscription;
  public cartCounter: number;

  //Отслеживаемый текущий пользователь
  private subscriptionClient: Subscription;
  public currentClient: Client = new Client;

  public totalPrice: number = null; //Общая стоимость

  constructor(public apiService: ApiService, private authService: AuthService, public cartService: CartService, public dialog: MatDialog) {
    //Установка отслеживаемых счетчика товаров и текущего пользователя
      this.subscriptionCart = this.cartService.cartCounter.subscribe(cartCounter => { this.cartCounter = cartCounter; });
      this.subscriptionClient = this.authService.currentClient.subscribe(currentClient => { this.currentClient = currentClient; });
  }

  ngOnInit(): void {
    //Установка списка продуктов и общей стоимости
    this.products = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  ngOnDestroy(){
    //Отписка от отслеживаний
    this.subscriptionCart.unsubscribe();
    this.subscriptionClient.unsubscribe();
  }

  //Метод для уменьшения на 1 количества товара в корзине
  minusProduct(product: Product){
    this.cartService.deleteFromCart(product.id);
    this.products = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  //Метод для увеличения на 1 количества товара в корзине
  plusProduct(product: Product){
    this.cartService.addToCart(product);
    this.products = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  //Метод для отправки заказа
  onSubmit(){
    if (this.cartCounter != 0 && this.currentClient.id) {
      let address: any = <HTMLInputElement>document.getElementsByClassName("address")[0];
      if(address.value){
        this.products = this.cartService.getItems();

        let orderProducts: OrderProduct[] = [];
        this.products.forEach(product => {
          orderProducts.push( new OrderProduct(product.id, product.amount));
        });
        let order: Order = new Order(address.value, orderProducts);

        this.apiService.postOrder(order).subscribe( (newOrderId: number) => {
          this.cartService.clearCart();
          this.products = this.cartService.getItems();
          this.openDialog(newOrderId);
        });
      } else{
        let errorMessage: any = document.getElementsByClassName("address_error_message")[0];
        errorMessage.style.display = "block";
      }
    }
  }

  //Метод для открытия высплывающего модального окна
  openDialog(newOrderId: number): void {
    const dialogRef = this.dialog.open(SuccessfulOrderDialogComponent, {
      width: 'auto', height: 'auto',
      data: {newOrderId: newOrderId, phone: this.currentClient.phone}
    });
  }

}
