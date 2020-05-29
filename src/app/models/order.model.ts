//Импорт класс-модели Товар заказа
import {OrderProduct} from "./order-product.model";

export class Order{ //Класс-модель заказа
  public address: string = '';  //Адрес
  public products: OrderProduct[] = []; //Массив товаров заказа

  constructor(address, products){
    this.address = address;
    this.products = products;
  }
}
