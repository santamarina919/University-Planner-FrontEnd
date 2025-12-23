import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import UserService from '../service/user-service';
import {Router} from '@angular/router';
import {HttpStatusCode} from '@angular/common/http';
import {PlanListPage} from '../plan-list-page/plan-list-page';
import {EMAIL, PASSWORD} from '../test-constants';
import {ROUTES} from '../app.routes';

export class LogInFormState {
  public constructor(public email :string,public password :string){}
}

@Component({
  selector: 'app-log-in-page',
  imports: [
    FormsModule
  ],
  templateUrl: './log-in-page.html',
  styleUrl: './log-in-page.css',
})
export class LogInPage {

  userService = inject(UserService)

  router = inject(Router)

  loginState = new LogInFormState(EMAIL,PASSWORD)

  sendLoginRequest(){
    this.userService.loginRequest(this.loginState)
      .subscribe(response => response.status == HttpStatusCode.Ok ? this.router.navigate([ROUTES.PLAN_LIST]) : console.log('uncool'))
  }

}
