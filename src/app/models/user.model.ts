export class User{
  public id: number = null;
  public first_name: string = "";
  public last_name: string = "";
  public email: string = "";
  public password: string = "";
  public created: string = "";
  public modified: string = "";

  constructor(first_name?, last_name?, email?, password?){
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }
}
