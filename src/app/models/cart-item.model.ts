//Импорт класс-модели Товар
import { Product } from "./product.model";

export class CartItem{  //Класс-модель товара в корзине
  public id: number = null; //id товара
  public name: string = ""; //Название товара
  public price: number = null;  //Цена товара
  public photo: string = '';  //Фото товара
  public amount: number = null; //Количество

  constructor(product?, amount?){
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.photo = product.photo;
    this.amount = amount;
  }
}
