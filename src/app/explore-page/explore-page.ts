import {Component, computed, inject, signal, Type} from '@angular/core';
import {DegreeService} from '../service/degree-service';
import {Address, Campus, Degree} from '../service/plan-service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {routeToCampus, routeToDegree} from '../app.routes';

export type SortingFunction = (degree1 :Degree, degree2 :Degree) => number

@Component({
  selector: 'app-explore-page',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './explore-page.html',
  styleUrl: './explore-page.css',
})
export class ExplorePage {
  degreeService = inject(DegreeService)

  degrees = signal<Degree[]>([])

  protected idFilter = signal<string>("");

  protected degreeFilter = signal<string>("");

  protected campusFilter = signal<string>("");

  showDegrees = computed(() => {
    return this.degrees().filter((curr) => {
      return curr.name.toLowerCase().includes(this.degreeFilter().toLowerCase()) &&
       curr.id.toLowerCase().includes(this.idFilter().toLowerCase()) &&
        curr.owningCampus.name.toLowerCase().includes(this.campusFilter().toLowerCase())
    })
  })

  constructor() {
    this.degreeService.allDegrees().subscribe(degrees => this.degrees.set(degrees))
  }

  updateIdFilter(event :Event) {
    this.idFilter.set((event.target as HTMLInputElement).value)
   }

  updateDegreeFilter(event :Event){
    this.degreeFilter.set((event.target as HTMLInputElement).value)
  }

  updateCampusFilter(event :Event){
    this.campusFilter.set((event.target as HTMLInputElement).value)
  }

  protected readonly routeToDegree = routeToDegree;
  protected readonly routeToCampus = routeToCampus;
}
