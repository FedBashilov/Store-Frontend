import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from "rxjs";

//Импорт сервисов
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

//Импорт класса-модели пользователя
import { Client } from '../../models/client.model';


@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.css']
})
//Компонент информации о пользователе
export class ClientAccountComponent implements OnInit, OnDestroy {

  public accountForm: FormGroup;  //Форма с информацией о пользователе
  public accountErrorMessage: string = "";  //Сообщение об ошибке в форме

  //Отслеживаемый текущий пользователь
  private subscriptionClient: Subscription;
  public currentClient: Client = new Client;


  constructor(private apiService: ApiService, private authService: AuthService, private fb: FormBuilder) {
    //Установка текущего пользователя
    this.subscriptionClient = this.authService.currentClient.subscribe(currentClient => { this.currentClient = currentClient; });
  }

  ngOnInit(): void {
    //Инициализация формы
    this.initForm();
  }

  ngOnDestroy(): void{
    //Отписка от отслеживания
    this.subscriptionClient.unsubscribe();
  }

  //Метод для инициализации формы
  initForm() {
    this.accountForm = this.fb.group({
      first_name: [this.currentClient.first_name, [
        Validators.required,
        Validators.minLength(2)
      ]
    ],
      last_name: [this.currentClient.last_name, [
        Validators.required,
        Validators.minLength(2)
      ]
    ],
      email: [this.currentClient.email, [
        Validators.required,
        Validators.email
      ]
    ],
    phone: [this.currentClient.phone, [
      Validators.required,
      Validators.pattern("^\\+?[0-9]*$")
      ]
    ],

    });
  }

  // Метод для контролирования валидации
  isControlInvalid(controlName: string, form: FormGroup): boolean {
    const control = form.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  //Метод для редактирования информации пользователя
  onSubmit() {
    const controls = this.accountForm.controls;
    if (this.accountForm.invalid) {
      Object.keys(controls)
       .forEach(controlName => {
         controls[controlName].markAsTouched();
       });
      return;
    }

    let client: Client = new Client(
      this.accountForm.value.first_name,
      this.accountForm.value.last_name,
      this.accountForm.value.email,
      this.accountForm.value.phone
    );
    client.id = this.currentClient.id;

    this.apiService.updateClient(client).subscribe( (response: any) =>{
      if(response.jwt){
        this.authService.setCurrentClient(response.jwt);
        this.showOrHideForm();
        this.accountErrorMessage = "";
      }
      else {
        this.accountErrorMessage = response;
      }
    });
  }

  //Метод для открытия или скрытия окна с формой
  showOrHideForm(){
    let movingAuthWindow: any = document.getElementsByClassName("moving_auth_window")[0];

    if(movingAuthWindow.classList.contains("show")){
      movingAuthWindow.classList.remove("show");
    } else {
      movingAuthWindow.classList.add("show");
    }
  }

  //Метод для выхода пользователя из учетной записи
  logout(){
    this.authService.logout();
    this.showOrHideForm();
  }



}
