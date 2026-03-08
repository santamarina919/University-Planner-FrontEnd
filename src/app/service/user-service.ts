import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpStatusCode} from '@angular/common/http';
import {Observable} from 'rxjs';
import { LOGIN_REQUEST, SIGNUP_REQUEST} from '../EndPoints';
import {LogInFormState} from '../log-in-page/log-in-page';


@Injectable({providedIn : 'root'})
export default class UserService{
  private http = inject(HttpClient)

  public signupRequest(formBody :{email:string,password:string,firstName:string}):Observable<HttpResponse<any>>{
    return this.http.post(SIGNUP_REQUEST,formBody,{observe : 'response'})
  }

  public loginRequest(formBody :LogInFormState){
    return this.http.post(LOGIN_REQUEST,formBody,{observe : 'response'})
  }

}
