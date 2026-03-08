import {Component, computed, input, Input} from '@angular/core';
import {Semester} from '../all-planned';
import {Course} from '../../../components/course/course';

@Component({
  selector: 'app-semester-card',
  imports: [
    Course
  ],
  templateUrl: './semester-card.component.html',
  styleUrl: './semester-card.component.css',
})
export class SemesterCard {

  semester = input.required<Semester>();

  totalUnits = computed(() => this.semester().courses.reduce((sum,curr) => sum += curr.units ,0))
}
