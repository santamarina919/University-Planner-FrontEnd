import {Component, computed, effect, Input, input, signal} from '@angular/core';
import {CourseState} from '../../service/plan-service';
import {NgClass} from '@angular/common';
import {applyWhenValue} from '@angular/forms/signals';

@Component({
  selector: 'app-course',
  imports: [
    NgClass
  ],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course {
  course = input.required<CourseState>()

  clickable = input(false)

  simpleView = input(false)

  stateView = input(true)

  transitionType = input<'none' | 'add' | 'remove'>('none')

  planned = computed(() => this.course().semesterPlanned != null)

  available = computed(() => this.course().firstSemesterPlannable != null)

  protected readonly applyWhenValue = applyWhenValue;
}
