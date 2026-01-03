import {Component, computed, effect, inject, input, model, signal} from '@angular/core';
import {ChangedCourseState, CourseState, PlanService, StateChange} from '../../service/plan-service';
import {Course} from '../../components/course/course';
import {ActivatedRoute} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {Arrow} from '../../components/arrow/arrow';
import {UndoArrow} from '../../components/undo-arrow/undo-arrow';
import {RedoArrow} from '../../components/redo-arrow/redo-arrow';

@Component({
  selector: 'app-add-remove-semester',
  imports: [
    Course,
    Arrow,
    UndoArrow,
    RedoArrow
  ],
  templateUrl: './add-remove-semester.html',
  styleUrl: './add-remove-semester.css',
})
export class AddRemoveSemester {
  planService = inject(PlanService)

  activatedRoute = inject(ActivatedRoute)

  START_SEMESTER = 1

  courseStates = model<CourseState[]>([])

  available = computed(() => this.courseStates().filter(course => course.semesterPlanned == null && course.firstSemesterPlannable != null && course.firstSemesterPlannable < this.currentSemester()))

  planned = computed(() => this.courseStates().filter(course => course.semesterPlanned != null && course.semesterPlanned == this.currentSemester()))

  unitTotal = computed(() => this.planned().map(course => course.units).reduce((acc,curr) => {return curr + acc},0))

  currentSemester = signal<number>(this.START_SEMESTER)

  changeSemesterBy(amount :number){
    if(this.currentSemester() + amount <= 0){
      return;
    }
    this.currentSemester.update(curr => curr + amount)
  }


  addCourse(surrogateId: string) {
    const planId = this.activatedRoute.snapshot.paramMap.get('planId')!
    this.planService.addCourseToPlan(planId,surrogateId,this.currentSemester())
      .subscribe(result => this.applyStateChanges(result))

  }

  applyStateChanges(stateChanges :StateChange){
    const courseChangeMap = new Map<string,ChangedCourseState>()
    stateChanges.courseStateChanges.forEach(newState => {
      courseChangeMap.set(newState.id,newState)
    })

    this.courseStates.update(prevStates => prevStates.map(courseState => {
      if (courseChangeMap.has(courseState.id)){
        console.log("this state changed")
        const newState = courseChangeMap.get(courseState.id)!

        const newFirstSemester = newState.firstSemesterPlanned == null ? courseState.firstSemesterPlannable : newState.firstSemesterPlanned
        const newSemesterPlanned = newState.semesterPlanned == null ? courseState.semesterPlanned : newState.semesterPlanned
        return {...courseState,firstSemesterPlannable : newFirstSemester,semesterPlanned : newSemesterPlanned};
      }else {
        return courseState;
      }
    }))

  }

  removeCourse(surrogateId: string) {
    throw new Error("TODO IMPLEMENT")
  }
}
