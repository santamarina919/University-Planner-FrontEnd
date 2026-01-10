import {Component, computed, HostListener, inject, model, signal} from '@angular/core';
import {ChangedCourseState, CourseState, PlanService} from '../service/plan-service';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {AddRemoveSemester} from './add-remove-semester/add-remove-semester';
import {map} from 'rxjs';
import {BackNavigation} from '../components/back-navigation/back-navigation';
import {ROUTES} from '../app.routes';




@Component({
  selector: 'app-plan-page',
  imports: [
    AsyncPipe,
    AddRemoveSemester,
    BackNavigation
  ],
  templateUrl: './plan-page.html',
  styleUrl: './plan-page.css',
})
export class PlanPage {
  route = inject(ActivatedRoute)

  planService = inject(PlanService)

  courseStates = signal<CourseState[]>([])


  constructor() {
    this.planService.courseStates(this.route.snapshot.paramMap.get("planId")!)
      .subscribe(response => this.courseStates.set(response))
  }

  protected readonly ROUTES = ROUTES;
}
