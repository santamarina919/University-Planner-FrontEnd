import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {submit} from '@angular/forms/signals';
import {SignUpFormState} from './SignUpFormState';
import UserService from '../service/user-service';
import {Router} from '@angular/router';
import {ROUTES} from '../app.routes';
import {EMAIL, FIRST_NAME, PASSWORD} from '../test-constants';

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

  userService = inject(UserService)

  router = inject(Router)

  formState = new SignUpFormState(EMAIL,PASSWORD,FIRST_NAME)

  sendSignUpRequest() {
    this.userService.signupRequest(this.formState)
      .subscribe(response => response.status == 200 ? this.router.navigate([ROUTES.LOGIN]) : console.log('handle error here'))
  }
}
