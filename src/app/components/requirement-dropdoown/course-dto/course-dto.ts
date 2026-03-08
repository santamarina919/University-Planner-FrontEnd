import {Component, input} from '@angular/core';
import {Course} from '../../course/course';
import {CourseDTO} from '../../../degree-page/degree-page';
import {RouterLink} from '@angular/router';
import {routeToCourse} from '../../../app.routes';

@Component({
  selector: 'app-course-dto',
  imports: [
    RouterLink
  ],
  templateUrl: './course-dto.html',
  styleUrl: './course-dto.css',
})
export class CourseDto {
  course = input.required<CourseDTO>()
  protected readonly routeToCourse = routeToCourse;
}
