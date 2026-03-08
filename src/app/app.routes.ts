import { Routes } from '@angular/router';
import {SignUp} from './sign-up-page/sign-up';
import {HomePage} from './home-page/home-page';
import {LogInPage} from './log-in-page/log-in-page';
import {PlanListPage} from './plan-list-page/plan-list-page';
import {CreatePlanPage} from './create-plan-page/create-plan-page';
import {PlanPage} from './plan-page/plan-page';
import {ExplorePage} from './explore-page/explore-page';
import {DegreePage} from './degree-page/degree-page';
import {Campus} from './service/plan-service';
import {CampusPage} from './campus-page/campus-page';
import {CoursePage} from './course-page/course-page';


export const routes: Routes = [
  {path : '', component : HomePage},
  {path : 'signup', component : SignUp},
  {path : 'login', component : LogInPage},
  {path : 'scheduler/list', component : PlanListPage},
  {path : 'scheduler/create', component : CreatePlanPage},
  {path : 'scheduler/plans/:planId' ,component : PlanPage},
  {path : 'explore',component : ExplorePage},
  {path : 'explore/degree/:degreeId', component : DegreePage},
  {path : 'explore/campus/:campusId',component : CampusPage},
  {path : 'explore/course/:courseId', component : CoursePage}

];

export const ROUTES = {
  HOMEPAGE : '/',
  SIGNUP   : '/signup',
  LOGIN    : '/login',
  PLAN_LIST: '/scheduler/list',
  CREATE_PLAN :'/scheduler/create',
  EXPLORE : '/explore',
}

export function routeToPlan(planId :string) {
  return`/scheduler/plans/${planId}`
}

export function routeToDegree(degreeId :string){
  return `/explore/degree/${degreeId}`
}

export function routeToCampus(campusId :string){
  return `/explore/campus/${campusId}`
}

export function routeToCourse(courseId :string){
  return `/explore/course/${courseId}`
}
