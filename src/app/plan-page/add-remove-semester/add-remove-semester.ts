import {Component, computed, effect, inject, Input, input, model, signal} from '@angular/core';
import {ChangedCourseState, CourseState, PlanService, StateChange} from '../../service/plan-service';
import {Course} from '../../components/course/course';
import {ActivatedRoute} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {Arrow} from '../../components/arrow/arrow';
import {UndoArrow} from '../../components/undo-arrow/undo-arrow';
import {RedoArrow} from '../../components/redo-arrow/redo-arrow';
import {BackNavigation} from '../../components/back-navigation/back-navigation';
import {ROUTES} from '../../app.routes';

@Component({
  selector: 'app-add-remove-semester',
  imports: [
    Course,
    Arrow,
  ],
  templateUrl: './add-remove-semester.html',
  styleUrl: './add-remove-semester.css',
})
export class AddRemoveSemester {

  START_SEMESTER = 1

  currentState = input.required<CourseState[]>()

  applyStateChange = input.required<(stateChange :StateChange) => void>()

  addCourse = input.required<(surrogateId :string,semester :number) => void>()

  removeCourse = input.required<(surrogateId :string) => void>()

  available = computed(() => this.currentState().filter(course => course.semesterPlanned == null && course.firstSemesterPlannable != null && this.currentSemester() >= course.firstSemesterPlannable))

  planned = computed(() => this.currentState().filter(course => course.semesterPlanned != null && course.semesterPlanned == this.currentSemester()))

  unitTotal = computed(() => this.planned().map(course => course.units).reduce((acc,curr) => {return curr + acc},0))

  currentSemester = signal<number>(this.START_SEMESTER)

  moveToPreviousState = input.required<() => void>()

  changeSemesterBy(amount :number){
    if(this.currentSemester() + amount <= 0){
      return;
    }
    this.currentSemester.update(curr => curr + amount)
  }





  protected readonly document = document;
  protected readonly ROUTES = ROUTES;
}
