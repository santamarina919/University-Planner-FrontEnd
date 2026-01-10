import {Component, effect, inject, input} from '@angular/core';
import {Degree, PlanDetails, PlanService} from '../../service/plan-service';
import {CHILD_DEGREES} from '../../EndPoints';
import {ObjectUnsubscribedError, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Router} from '@angular/router';
import {routeToPlan} from '../../app.routes';

@Component({
  selector: 'app-plan-card',
  imports: [
    AsyncPipe
  ],
  templateUrl: './plan-card.html',
  styleUrl: './plan-card.css',
})
export class PlanCard {
  planService = inject(PlanService)

  planDetails = input.required<PlanDetails>()

  childDegrees! :Observable<Degree[]>

  router = inject(Router)

  constructor() {
    effect(() => {
      this.childDegrees = this.planService.childDegreesOfPlan(this.planDetails().id)
    });
  }

  protected degreesAsStr(degrees: Degree[]) {
    return (degrees.length == 1 ? 'Degree: ' : 'Degrees ') +  degrees.map(degree => degree.name).join(',');
  }



  protected routeToPlanPage() {
    document.startViewTransition(async () => {
      this.router.navigate([routeToPlan(this.planDetails().id)])
    })
  }
  formatDate(dateStr: string): string {
    const date = new Date(dateStr + "T00:00");

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateStr;
    }

    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };

    // Returns "Month, Day Year" (e.g., "October, 25 2023")
    // Note: The comma placement is controlled by the locale string
    return date.toLocaleDateString('en-US', options);
  }
}
