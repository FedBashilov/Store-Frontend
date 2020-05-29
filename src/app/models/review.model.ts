//Импорт класс-модели Пользователь
import {Client} from "./client.model";

export class Review{  //Класс-модель отзыва
  public product_id: number = null; //id товара
  public text: string = ''; //Текст
  public rating: number = null; //Оценка
  public modified: Date = new Date(); //Дата
  public client: Client = new Client(); //Пользователь

  constructor(product_id?, text?, rating?){
    this.product_id = product_id;
    this.text = text;
    this.rating = rating;
  }

}
