import {Component, computed, input, signal} from '@angular/core';
import {CourseState} from '../../service/plan-service';
import {Course} from '../../components/course/course';

@Component({
  selector: 'app-state-analyzer',
  imports: [
    Course
  ],
  templateUrl: './state-analyzer.html',
  styleUrl: './state-analyzer.css',
})
export class StateAnalyzer {

  courseStates = input.required<CourseState[]>()

  sortValues = ['Nothing','Semester Available','Semester Planned','Name','ID']

  sortIndex = signal(0)

  sortFunction = computed(() => this.sortFunctions[this.sortIndex()])

  displayStates = computed<CourseState[]>(() => {
    return this.courseStates().slice().sort(this.sortFunction())
  })

  sortDescription = computed<string>(() => this.sortValues[this.sortIndex()])

  sortByNothing = (a :CourseState, b :CourseState) =>{
    return 0
  }

  sortByName = (a :CourseState, b :CourseState)=> {
    return a.name.localeCompare(b.name)
  }

  sortByAvailable = (a :CourseState, b :CourseState) =>{
    if(a.firstSemesterPlannable == b.firstSemesterPlannable){
      return this.sortByName(a,b)
    }
    else if(a.firstSemesterPlannable == null) {
      return Number.MAX_SAFE_INTEGER
    }
    else if(b.firstSemesterPlannable == null){
      return Number.MIN_SAFE_INTEGER
    }
    else {
      return a.firstSemesterPlannable - b.firstSemesterPlannable
    }
  }

  sortByPlanned = (a :CourseState, b :CourseState) =>{
    if(a.semesterPlanned == b.semesterPlanned){
      return this.sortByName(a,b)
    }
    if(a.semesterPlanned == null){
      return Number.MAX_SAFE_INTEGER
    }
    else if(b.semesterPlanned == null){
      return Number.MIN_SAFE_INTEGER
    }
    else {
      return a.semesterPlanned - b.semesterPlanned
    }
  }

  sortById = (a :CourseState, b :CourseState)=>{
    return a.courseId.localeCompare(b.courseId)
  }

  protected changeSortValue() {
    this.sortIndex.update((prev) => (prev + 1) % this.sortFunctions.length)
  }


  sortFunctions = [this.sortByNothing,this.sortByAvailable,this.sortByPlanned,this.sortByName,this.sortById]
}

