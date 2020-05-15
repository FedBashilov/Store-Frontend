import {OrderProduct} from "./order-product.model";

export class Order{
  public address: string = '';
  public products: OrderProduct[] = [];

  constructor(address, products){
    this.address = address;
    this.products = products;
  }
}
