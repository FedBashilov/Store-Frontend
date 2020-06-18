export class OrderProduct { //Класс-модель товара заказа
  public id: number = null; //id товара
  public amount: number = null; //Количество

  constructor(id, amount){
    this.id = id;
    this.amount = amount;
  }
}
