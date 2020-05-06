import {OrderProduct} from "./order-product.model";

export class Order{
  public client_name: string = '';
  public client_phone: string = '';
  public client_address: string = '';
  public products: OrderProduct[] = [];

  constructor(name, phone, address){
    this.client_name = name;
    this.client_phone = phone;
    this.client_address = address;
  }
}
