import { Routes } from '@angular/router';
import {SignUp} from './sign-up-page/sign-up';
import {HomePage} from './home-page/home-page';
import {LogInPage} from './log-in-page/log-in-page';
import {PlanListPage} from './plan-list-page/plan-list-page';
import {CreatePlanPage} from './create-plan-page/create-plan-page';


export const routes: Routes = [
  {path : '', component : HomePage},
  {path : 'signup', component : SignUp},
  {path : 'login', component : LogInPage},
  {path : 'scheduler/list', component : PlanListPage},
  {path : 'scheduler/create', component : CreatePlanPage},
  {path : 'scheduler/plans/:planId' ,component : HomePage}
];

export const ROUTES = {
  HOMEPAGE : '/',
  SIGNUP   : '/signup',
  LOGIN    : '/login',
  PLAN_LIST: '/scheduler/list',
  CREATE_PLAN :'/scheduler/create'
}

export function specificPlanPath(planId :string) {
  return`/scheduler/plans/${planId}`
}
