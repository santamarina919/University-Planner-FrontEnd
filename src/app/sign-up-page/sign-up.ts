import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {submit} from '@angular/forms/signals';
import {SignUpFormState} from './SignUpFormState';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {

  protected readonly submit = submit;

  formState = new SignUpFormState('INVALID','FORM','DATA')

  sendSignUpRequest() {
    console.log(this.formState)
  }
}
