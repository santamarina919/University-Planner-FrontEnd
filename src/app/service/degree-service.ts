import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Campus} from './plan-service';
import {Observable} from 'rxjs';
import {ALL_CAMPUS, DEGREES_FROM} from '../EndPoints';
import {Degree} from '../create-plan-page/create-plan-page';


@Injectable({providedIn : 'root'})
export class DegreeService {
  http = inject(HttpClient)

  public allCampus() :Observable<Campus[]>{
    return this.http.get<Campus[]>(ALL_CAMPUS)
  }

  public degreesFrom(campusId :string):Observable<Degree[]>{
    return this.http.get<Degree[]>(DEGREES_FROM,{params : new HttpParams().set('campusId',campusId)})
  }

}
