export class Client{  //Класс-модель пользователя
  public id: number = null; //id пользователя
  public first_name: string = ""; //Имя
  public last_name: string = "";  //Фалимия
  public email: string = "";  //Электронная почта
  public phone: string = "";  //Телефон
  public password: string = ""; //Пароль
  public created: string = "";  //Дата регистрации
  public modified: string = ""; //Дата последнего изменения информации

  constructor(first_name?, last_name?, email?, phone?, password?){
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}
