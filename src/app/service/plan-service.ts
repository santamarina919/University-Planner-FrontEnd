import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ADD_COURSE, ALL_PLANS, COURSE_STATES, CREATE_PLAN, REMOVE_COURSE} from '../EndPoints';


export interface PlanDetails {
  id : string,
  name :string,
  date :string
  campus :Campus
}

export interface Campus {
  id : string
  streetName : string,
  streetNumber :string,
  city :string,
  postalCode : string,
  name :string
}

export interface CourseState {
  id :string,
  courseId :string,
  name :string,
  units :number,
  firstSemesterPlannable :number | null,
  semesterPlanned :number | null
}

export interface ChangedCourseState {
  id :string
  firstSemesterPlannable :number | null
  semesterPlanned :number | null
}

export interface StateChange {
  courseStateChanges : ChangedCourseState[]
}

export class PlanFrom {
  public constructor(public name :string, public degreeIds :string[]){}
}

@Injectable({providedIn : 'root'})
export class PlanService {
  http = inject(HttpClient)

  public allPlans(){
    return this.http.get<PlanDetails[]>(ALL_PLANS,{credentials : 'include'})
  }

  public createPlan(planDetails :PlanFrom){
    return this.http.post<string>(CREATE_PLAN,planDetails)
  }

  public courseStates(planId :string){
    return this.http.get<CourseState[]>(COURSE_STATES,{params : new HttpParams().set('planId',planId)})
  }

  public addCourseToPlan(planId :string, surrogateId :string, semester :number){
    return this.http.post<StateChange>(ADD_COURSE(planId),{},{params : new HttpParams().set('courseId',surrogateId).set('semester',semester)})
  }

  removeCourseFromPlan(planId: string, surrogateId: string) {
    return this.http.post<StateChange>(REMOVE_COURSE(planId),{},{params : new HttpParams().set('courseId',surrogateId)})
  }

}
