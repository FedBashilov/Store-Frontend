import {Client} from "./client.model";

export class Review{
  public product_id: number = null;
  public text: string = '';
  public rating: number = null;
  public modified: Date = new Date();
  public client: Client = new Client();

  constructor(product_id?, text?, rating?){
    this.product_id = product_id;
    this.text = text;
    this.rating = rating;
  }

}
