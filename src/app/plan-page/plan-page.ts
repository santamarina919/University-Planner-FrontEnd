import {Component, inject} from '@angular/core';
import {PlanService} from '../service/plan-service';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-plan-page',
  imports: [
    AsyncPipe
  ],
  templateUrl: './plan-page.html',
  styleUrl: './plan-page.css',
})
export class PlanPage {
  route = inject(ActivatedRoute)

  planService = inject(PlanService)

  states = this.planService.courseStates(this.route.snapshot.paramMap.get("planId")!)



}
