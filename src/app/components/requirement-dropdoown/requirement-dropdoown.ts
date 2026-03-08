import {Component, input, signal} from '@angular/core';
import {EnummeratedRequirement} from '../../degree-page/degree-page';
import {Course} from '../course/course';
import {CourseDto} from './course-dto/course-dto';
import {DropdownDown} from '../dropdown-down/dropdown-down';
import {DropdownUp} from '../dropdown-up/dropdown-up';

@Component({
  selector: 'app-requirement-dropdoown',
  imports: [
    CourseDto,
    DropdownDown,
    DropdownUp
  ],
  templateUrl: './requirement-dropdoown.html',
  styleUrl: './requirement-dropdoown.css',
})
export class RequirementDropdoown {
  requirement = input.required<EnummeratedRequirement>()

  leftPadding = input.required<number>()

  shown = signal(false)

  borderColors = ['lightblue','lightcoral','lightgreen']

  borderIndex = input.required<number>()

  toggleShown(){
    this.shown.update((prev) => !prev)
  }


}
