import {Component, computed, input, signal} from '@angular/core';
import {PrerequisiteDetails} from '../../service/plan-service';
import {DropdownDown} from '../../components/dropdown-down/dropdown-down';
import {DropdownUp} from '../../components/dropdown-up/dropdown-up';
import {RouterLink} from '@angular/router';
import {routeToCourse} from '../../app.routes';

@Component({
  selector: 'app-prerequisite-comp',
  imports: [
    DropdownDown,
    DropdownUp,
    RouterLink
  ],
  templateUrl: './prerequisite-comp.html',
  styleUrl: './prerequisite-comp.css',
})
export class PrerequisiteComp {
  prerequisite = input.required<PrerequisiteDetails>()

  componentPadding = input.required<number>()

  borderColors = ['lightblue','lightcoral','lightgreen']

  borderColorIndex = input.required<number>()

  color = computed(() => this.borderColors[this.borderColorIndex()])

  hideContent = signal<boolean>(true)


  protected toggleContent() {
    this.hideContent.update((prev) => !prev)
  }

  protected readonly routeToCourse = routeToCourse;
}
