import {Component, computed, Input, input} from '@angular/core';
import {ChangedCourseState, CourseState} from '../../service/plan-service';
import {Course} from '../../components/course/course';
import {SemesterCard} from './semester/semester-card.component';

export class Semester {
  constructor(
    public semNumber :number,
    public courses :CourseState[]
  ){}

}

@Component({
  selector: 'app-all-planned',
  imports: [
    SemesterCard,
  ],
  templateUrl: './all-planned.html',
  styleUrl: './all-planned.css',
})
export class AllPlanned {
  currentState = input.required<CourseState[]>()

  semesters = computed<Semester[]>(() => this.groupBySemester(this.currentState()))

  private groupBySemester(courseStates: CourseState[]) {
    const semesterMap = new Map<number,Semester>()
    courseStates.forEach(state => {
      if(state.semesterPlanned == null) return
      if(semesterMap.has(state.semesterPlanned)){
        semesterMap.get(state.semesterPlanned)!.courses.push(state)
      }
      else {
        semesterMap.set(state.semesterPlanned,new Semester(state.semesterPlanned,[state]))
      }
    })
    const sortedSemesters = [...semesterMap.values()].sort((a,b) => {
      return a.semNumber - b.semNumber
    })

    let currIndex = 0
    let currSemester = 1
    const allSemesters = []
    while (currIndex < sortedSemesters.length){
      const semesterInArr = sortedSemesters[currIndex]
      if(semesterInArr.semNumber == currSemester){
        allSemesters.push(semesterInArr)
        currIndex++
        currSemester++
        continue
      }
      while(currSemester != semesterInArr.semNumber){
        allSemesters.push(new Semester(currSemester++,[]))
      }

    }
    return allSemesters
  }

}
