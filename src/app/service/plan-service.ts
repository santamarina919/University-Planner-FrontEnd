import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {
  ADD_COURSE,
  ALL_PLANS, APPLY_STATE, CAMPUS_DATA,
  CHILD_DEGREES, COURSE_DATA,
  COURSE_STATES,
  CREATE_PLAN,
  REMOVE_COURSE, REQUIREMENT_STRUCTURE,
  RESET_PLAN
} from '../EndPoints';
import {map} from 'rxjs';
import {Course} from '../components/course/course';
import {DegreeNode} from '../plan-page/plan-page';
import {CourseDTO} from '../degree-page/degree-page';


export interface PlanDetails {
  id : string,
  name :string,
  date :string
  campus :Campus
  creationDate :string
}

export interface Address {
  streetName : string,
  streetNumber :string,
  city :string,
  postalCode : string,
}

export class Campus {
  id : string
  name :string
  address :Address


  constructor(id: string, name: string, address: Address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
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

export type DegreeIdAndName = {
  id :string
  name :string

}

export type CampusDegreeDetails = {
  campus :Campus
  degree :DegreeIdAndName[]
}

export interface Degree{
  id:string
  name:string
  owningCampus :Campus
}

export type CourseDetails =  {
  surrogateId :string
  courseId :string
  name :string
  units :number
  rootPrereq :PrerequisiteDetails
  owningCampus :Campus
}

export type PrerequisiteDetails = {
  id :string
  type :'AND' | 'OR'
  children :PrerequisiteDetails[]
  leafCourses :CourseDTO[]
}

@Injectable({providedIn : 'root'})
export class PlanService {
  http = inject(HttpClient)
  public allPlans(){
    return this.http.get<PlanDetails[]>(ALL_PLANS,{credentials : 'include'}).pipe(
      map(plans => plans.sort((a, b) => {
        return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
      }))
    );
  }

  public createPlan(planDetails :PlanFrom){
    return this.http.post<string>(CREATE_PLAN,planDetails)
  }

  public courseStates(planId :string){
    return this.http.get<CourseState[]>(COURSE_STATES,{params : new HttpParams().set('planId',planId)})
  }

  public addCourseToPlan(planId: string, surrogateId: string, semester: number, withState: CourseState[] | null){
    return this.http.post<StateChange>(ADD_COURSE(planId),withState,{params : new HttpParams().set('courseId',surrogateId).set('semester',semester)})
  }

  removeCourseFromPlan(planId: string, surrogateId: string,withState: CourseState[] | null) {
    return this.http.post<StateChange>(REMOVE_COURSE(planId),withState,{params : new HttpParams().set('courseId',surrogateId)})
  }

  public childDegreesOfPlan(planId :string){
    return this.http.get<Degree[]>(CHILD_DEGREES,{params : new HttpParams().set('planId',planId)})
  }

  public resetState(planId: string) {
    return this.http.post<ChangedCourseState[]>(RESET_PLAN,{},{params : new HttpParams().set('planId',planId)})
  }

  public applyPreviousState(planId :string, states :CourseState[]){
    return this.http.post(APPLY_STATE,states,{params : new HttpParams().set('planId',planId), observe : 'response'})
  }

  public requirementStructure(planId :string){
    return this.http.get<DegreeNode[]>(REQUIREMENT_STRUCTURE(planId))
  }

  public campusDetails(campusId: string) {
    return this.http.get<CampusDegreeDetails>((CAMPUS_DATA(campusId)))
  }

  public courseDetails(courseId :string){
    return this.http.get<CourseDetails>(COURSE_DATA(courseId))
  }
}
