import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from "rxjs";


import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

import { Client } from '../../models/client.model';


@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.css']
})
export class ClientAccountComponent implements OnInit, OnDestroy {

  accountForm: FormGroup;
  accountErrorMessage: string = "";

  private subscriptionClient: Subscription;
  public currentClient: Client = new Client;


  constructor(private apiService: ApiService, private authService: AuthService, private fb: FormBuilder) {
    this.subscriptionClient = this.authService.currentClient.subscribe(currentClient => { this.currentClient = currentClient; });
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void{
    this.subscriptionClient.unsubscribe();
  }

  initForm(){

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

  isControlInvalid(controlName: string, form: FormGroup): boolean {
    const control = form.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }


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
        } else {
          this.accountErrorMessage = response;
        }
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
    this.authService.logout();
    this.showOrHideForm();
  }



}
