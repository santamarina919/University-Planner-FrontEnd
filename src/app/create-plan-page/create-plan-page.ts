import {Component, computed, effect, inject, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DegreeService} from '../service/degree-service';
import {Observable} from 'rxjs';
import {Campus, PlanFrom, PlanService} from '../service/plan-service';
import {AsyncPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {specificPlanPath} from '../app.routes';

export interface Degree{
  id :string,
  name :string
}


@Component({
  selector: 'app-create-plan-page',
  imports: [
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './create-plan-page.html',
  styleUrl: './create-plan-page.css',
})
export class CreatePlanPage {
  router = inject(Router)

  degreeService = inject(DegreeService)

  planService = inject(PlanService)

  campuses! :Observable<Campus[]>

  selectedCampus = signal<string | null>(null)

  degrees = computed<Observable<Degree[]> | null>(() => {
    if(this.selectedCampus() == null){
      return null;
    }
    return this.degreeService.degreesFrom(this.selectedCampus()!)
  })

  planForm = new PlanFrom("Invalid Plan",[])

  constructor() {
    effect(() => {
      this.campuses = this.degreeService.allCampus()
    });
  }


  submitForm() {
    this.planService.createPlan(this.planForm)
      .subscribe(planId => this.router.navigate([specificPlanPath(planId)]))
  }

  fetchDegreesOfUniversity(event: any) {
    this.selectedCampus.set(event.target.value)
  }

  updateSelectedDegreeList($event: any) {
    const chosenDegree = $event.target.value
    this.planForm.degreeIds.push(chosenDegree)
  }
}
