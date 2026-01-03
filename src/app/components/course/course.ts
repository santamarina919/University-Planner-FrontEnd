import {Component, computed, effect, Input, input, signal} from '@angular/core';
import {CourseState} from '../../service/plan-service';
import {NgClass} from '@angular/common';

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

  transitionType = input<'none' | 'add' | 'remove'>('none')

}
