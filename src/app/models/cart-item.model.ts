import { Product } from "./product.model";

export class CartItem{
  public id: number = null;
  public name: string = "";
  public price: number = null;
  public photo: string = '';
  public amount: number = null;

  constructor(product?, amount?){
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.photo = product.photo;
    this.amount = amount;
  }
}
