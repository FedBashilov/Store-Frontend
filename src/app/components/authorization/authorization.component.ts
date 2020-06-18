import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Импорт компонента информации о клиенте
import { ClientAccountComponent } from '../client-account/client-account.component';

//Импорт сервисов
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
//Компонент для авторизации пользователя
export class AuthorizationComponent implements OnInit, OnDestroy {

  public isRegistered: boolean = true;  //Для того, какую форму показывать пользователю
  public loginForm: FormGroup;  //Форма входа
  public loginErrorMessage: string = "";  //Сообщения об ошибке формы входа
  public registrationForm: FormGroup; //Форма регистрации
  public registrationErrorMessage: string = ""; //Сообщения об ошибке формы регистрации

  //Отслеживаемый текущий пользователь
  private subscriptionClient: Subscription;
  public currentClient: Client = new Client;

  constructor(private authService: AuthService, private apiService: ApiService, private fb: FormBuilder) {
    //Подписка на текущего пользователя
    this.subscriptionClient = this.authService.currentClient.subscribe(currentClient => {
      this.currentClient = currentClient;
    });
  }

  ngOnInit(): void {
    //Инициализация форм
    this.initForms();
  }


  ngOnDestroy(){
    //Отписка от отслеживания
    this.subscriptionClient.unsubscribe();
  }

  //Метод для инициализации форм
  initForms(){
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]
    ],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]
    ],
    });

    this.registrationForm = this.fb.group({
      first_name: ['', [
        Validators.required,
        Validators.minLength(2)
      ]
    ],
      last_name: ['', [
        Validators.required,
        Validators.minLength(2)
      ]
    ],
      email: ['', [
        Validators.required,
        Validators.email
      ]
    ],
    phone: ['', [
      Validators.required,
      Validators.pattern("^\\+?[0-9]*$")
      ]
    ],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
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

  //Метод для входа пользователя
  onSubmitLogin() {
    const controls = this.loginForm.controls;
    if (this.loginForm.invalid) {
      Object.keys(controls)
       .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe( (response: any) =>{
      if(response.jwt){
        this.authService.setCurrentClient(response.jwt);
        this.showOrHideForm();
        this.loginErrorMessage = "";
      } else {
        this.loginErrorMessage = response;
      }

    });
  }

  //Метод для регистрации пользователя
  onSubmitRegistration() {
    const controls = this.registrationForm.controls;
    if (this.registrationForm.invalid) {
      Object.keys(controls)
       .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    let newClient: Client = new Client(
      this.registrationForm.value.first_name,
      this.registrationForm.value.last_name,
      this.registrationForm.value.email,
      this.registrationForm.value.phone,
      this.registrationForm.value.password
    );

    this.authService.registration(newClient).subscribe( (response: any) =>{

      if(response.jwt){
        this.authService.setCurrentClient(response.jwt);
        this.showOrHideForm();
        this.registrationErrorMessage = "";
      } else {
        this.registrationErrorMessage = response;
      }
    });
  }

  //Метод для открытия или скрытия окна с формами
  showOrHideForm(){
    let movingAuthWindow: any = document.getElementsByClassName("moving_auth_window")[0];

    if(movingAuthWindow.classList.contains("show")){
      movingAuthWindow.classList.remove("show");
    } else {
      movingAuthWindow.classList.add("show");
    }
  }


}
