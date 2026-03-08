import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DegreeService} from '../service/degree-service';
import {Course} from '../components/course/course';
import {Campus} from '../service/plan-service';
import {Requirement} from '../plan-page/progress/degree/requirement/requirement';
import {RequirementDropdoown} from '../components/requirement-dropdoown/requirement-dropdoown';


export type EnummeratedDegree = {
  degreeId :string
  name :string
  rootRequirement :EnummeratedRequirement
  owningCampus :Campus
}

export type RequirementType = "OR" | "AND"

export type EnummeratedRequirement = {
  requirementId :string
  name :string | null
  type : RequirementType
  childReqs :EnummeratedRequirement[]
  leafCourses :CourseDTO[]
}

export type CourseDTO = {
  id :string
  courseId :string
  name :string
  units :number
  campusId :string
}

@Component({
  selector: 'app-degree-page',
  imports: [
    Requirement,
    RequirementDropdoown
  ],
  templateUrl: './degree-page.html',
  styleUrl: './degree-page.css',
})
export class DegreePage {
  activatedRoute = inject(ActivatedRoute)

  degreeService = inject(DegreeService)

  degree = signal<EnummeratedDegree | null>(null)


  constructor() {
    effect(() => {
      const degreeId = this.activatedRoute.snapshot.paramMap.get('degreeId')!
      this.degreeService.degreeData(degreeId)
        .subscribe(response => this.degree.set(response))
    });
  }

}
