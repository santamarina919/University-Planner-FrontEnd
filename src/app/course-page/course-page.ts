import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DegreeService} from '../service/degree-service';
import {Course} from '../components/course/course';
import {CourseDetails, PlanService} from '../service/plan-service';
import {PrerequisiteComp} from './prerequisite-comp/prerequisite-comp';

@Component({
  selector: 'app-course-page',
  imports: [
    PrerequisiteComp
  ],
  templateUrl: './course-page.html',
  styleUrl: './course-page.css',
})
export class CoursePage {
  activatedRoute = inject(ActivatedRoute)

  planService = inject(PlanService)

  courseData = signal<CourseDetails| null>(null)

  constructor() {
    effect(() => {
      const courseId = this.activatedRoute.snapshot.paramMap.get('courseId')!;
      this.planService.courseDetails(courseId)
        .subscribe(result => this.courseData.set(result))

    });
  }

}


