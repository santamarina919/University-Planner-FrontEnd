import {Component, effect, inject} from '@angular/core';
import {PlanDetails, PlanService} from '../service/plan-service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ROUTES} from '../app.routes';
import {PlanCard} from './plan-card/plan-card';

@Component({
  selector: 'app-plan-list-page',
  imports: [
    AsyncPipe,
    RouterLink,
    PlanCard
  ],
  templateUrl: './plan-list-page.html',
  styleUrl: './plan-list-page.css',
})
export class PlanListPage {
  planService = inject(PlanService)

  plans$! :Observable<PlanDetails[]>

  constructor() {
    effect(() => {
      this.plans$ = this.planService.allPlans();
    });
  }

  protected readonly ROUTES = ROUTES;
}
