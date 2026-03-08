import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Campus, Degree} from './plan-service';
import {Observable} from 'rxjs';
import {ALL_CAMPUS, ALL_DEGREES, DEGREE_DATA, DEGREES_FROM} from '../EndPoints';
import {EnummeratedDegree} from '../degree-page/degree-page';


@Injectable({providedIn : 'root'})
export class DegreeService {
  http = inject(HttpClient)

  public allCampus() :Observable<Campus[]>{
    return this.http.get<Campus[]>(ALL_CAMPUS)
  }

  public degreesFrom(campusId :string):Observable<Degree[]>{
    return this.http.get<Degree[]>(DEGREES_FROM,{params : new HttpParams().set('campusId',campusId)})
  }


  public allDegrees() {
    return this.http.get<Degree[]>(ALL_DEGREES)
  }

  public degreeData(degreeId :string) {
    return this.http.get<EnummeratedDegree>(DEGREE_DATA(degreeId))
  }

}
