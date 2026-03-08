import {Component, computed, input} from '@angular/core';
import {DegreeNode} from '../plan-page';
import {CourseState} from '../../service/plan-service';
import {DegreeComponent} from './degree/degree.component';

@Component({
  selector: 'app-progress',
  imports: [
    DegreeComponent
  ],
  templateUrl: './progress.html',
  styleUrl: './progress.css',
})
export class Progress {
  degrees = input.required<DegreeNode[]>()

  states = input.required<CourseState[]>()

  stateMap = computed(() => {
    const map = new Map<string,CourseState>()
    this.states().forEach(state => {
      map.set(state.id,state)
    })
    return map
  })
}
