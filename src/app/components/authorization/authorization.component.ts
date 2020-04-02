import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  public isLoggedin: boolean = false;
  public isRegistered: boolean = true;
  loginForm: FormGroup;
  loginErrorMessage: string = "";
  registrationForm: FormGroup;
  public user: User = new User();

  constructor(private authService: AuthService, private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForms();
    this.isLoggedin = this.authService.getJWT() ? true : false;
    this.setUser();
  }

  setUser(){
    let jwt = this.authService.getJWT();
    if( jwt ){
      this.apiService.getUserInfo(jwt).subscribe( (response)=>{
        this.user = response;
      });
    }
  }

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
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]
    ],
    });
  }

  isControlInvalid(controlName: string, form: FormGroup): boolean {
    const control = form.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmitLogin() {
    const controls = this.loginForm.controls;
    if (this.loginForm.invalid) {
      Object.keys(controls)
       .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    //do request
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe( (response: any) =>{
      if(response.jwt){
        this.authService.setJWT(response.jwt);
        this.showOrHideForm();
        this.isLoggedin = this.authService.getJWT() ? true : false;
        this.setUser();
        this.loginErrorMessage = "";
      } else {
        this.loginErrorMessage = response;
      }

    });
  }

  onSubmitRegistration() {
    const controls = this.registrationForm.controls;
    if (this.registrationForm.invalid) {
      Object.keys(controls)
       .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    let newUser: User = new User(
      this.registrationForm.value.first_name,
      this.registrationForm.value.last_name,
      this.registrationForm.value.email,
      this.registrationForm.value.password
    );
    //do request
    this.authService.registration(newUser).subscribe( (response: string) =>{
      this.authService.setJWT(response);
      this.showOrHideForm();
      this.loginErrorMessage = "";
      this.isLoggedin = this.authService.getJWT() ? true : false;
      this.setUser();
    });
  }


  showOrHideForm(){
    let movingAuthWindow: any = document.getElementsByClassName("moving_auth_window")[0];
    let curtain: any = document.getElementsByClassName("form_curtain")[0];

    if(movingAuthWindow.classList.contains("show")){
      movingAuthWindow.classList.remove("show");
      curtain.classList.remove("on");
      curtain.classList.add("off");
    } else {
      movingAuthWindow.classList.add("show");
      curtain.classList.remove("off");
      curtain.classList.add("on");
    }
  }

  logout(){
    this.authService.deleteJWT();
    this.isLoggedin = this.authService.getJWT() ? true : false;
  }
}
