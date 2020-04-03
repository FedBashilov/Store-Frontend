export class CartItem{
  public id: number = null;
  public name: string = "";
  public price: number = null;
  public amount: number = null;

  constructor(id?, name?, price?, amount?){
    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
  }
}
