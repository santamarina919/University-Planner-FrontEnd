import {Component, effect, inject, input, signal} from '@angular/core';
import {Campus, CampusDegreeDetails, PlanService} from '../service/plan-service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CAMPUS_DATA} from '../EndPoints';
import {routeToDegree} from '../app.routes';

@Component({
  selector: 'app-campus-page',
  imports: [
    RouterLink
  ],
  templateUrl: './campus-page.html',
  styleUrl: './campus-page.css',
})
export class CampusPage {
  activatedRoute = inject(ActivatedRoute)

  planDetails = inject(PlanService)

  campusDetails = signal<CampusDegreeDetails | null>(null)

  constructor() {
    effect(() => {
      const campusId = this.activatedRoute.snapshot.paramMap.get('campusId')!
      this.planDetails.campusDetails(campusId)
        .subscribe(result => this.campusDetails.set(result))

    });
  }


  protected readonly routeToDegree = routeToDegree;
}
