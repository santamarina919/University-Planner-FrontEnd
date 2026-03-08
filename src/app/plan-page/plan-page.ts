import {Component, computed, HostListener, inject, model, signal, WritableSignal} from '@angular/core';
import {ChangedCourseState, CourseState, PlanService, StateChange} from '../service/plan-service';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {AddRemoveSemester} from './add-remove-semester/add-remove-semester';
import {flatMap, map, Subscription} from 'rxjs';
import {BackNavigation} from '../components/back-navigation/back-navigation';
import {ROUTES} from '../app.routes';
import {UndoArrow} from '../components/undo-arrow/undo-arrow';
import {RedoArrow} from '../components/redo-arrow/redo-arrow';
import {StateAnalyzer} from './state-analyzer/state-analyzer';
import {HttpStatusCode} from '@angular/common/http';
import {AllPlanned} from './all-planned/all-planned';
import {Progress} from './progress/progress';


export class DegreeNode {
  constructor(public id :string,
              public name :string,
              public requirement :RequirementNode) {
  }
}

export class RequirementNode {
  constructor(
    public id :string,
    public name :string | null,
    public childRequirements :RequirementNode[],
    public leafCourses :string[],
    public type :"OR" | "AND"
  ) {
  }
}


@Component({
  selector: 'app-plan-page',
  imports: [
    AddRemoveSemester,
    BackNavigation,
    UndoArrow,
    RedoArrow,
    StateAnalyzer,
    AllPlanned,
    Progress
  ],
  templateUrl: './plan-page.html',
  styleUrl: './plan-page.css',
})
export class PlanPage {
  route = inject(ActivatedRoute)

  planService = inject(PlanService)

  stateDescription = new Map<number,string>()

  degreeStructure = signal<DegreeNode[]>([])

  allStates = signal<CourseState[][]>([])

  currentStateIndex = signal(0)

  currentState = computed(() => {
    if(this.allStates().length == 0){
      return null
    }
    return this.allStates()[this.currentStateIndex()]
  })

  courseStateById = computed<Map<string,CourseState>>(() => {
    const stateMap = new Map<string,CourseState>()
    this.currentState()?.forEach((course) => {
      stateMap.set(course.id,course)
    })
    return stateMap
  })

  showStates = signal(false)

  showPlanned = signal(false)

  showProgress = signal(false)

  constructor() {
    const planId = this.route.snapshot.paramMap.get("planId")!

    this.planService.requirementStructure(planId)
      .subscribe(response => this.degreeStructure.set(response))

    this.planService.courseStates(planId)
      .subscribe(initialState => this.allStates.update(allStates => {
        allStates.push(initialState)
        return allStates.slice()
      }))
    this.stateDescription.set(0,"Initial state")

  }

  addCourse = (surrogateId: string,semester :number)=> {
    let withState :CourseState[] | null = null
    if(this.currentStateIndex() < this.allStates().length){
      withState = this.currentState()?.filter(state => state.semesterPlanned != null) ?? null
    }
    const planId = this.route.snapshot.paramMap.get('planId')!
    this.planService.addCourseToPlan(planId,surrogateId,semester,withState)
      .subscribe(changes => {
        const course = this.courseStateById().get(surrogateId)!
        this.stateDescription.set(this.currentStateIndex() + 1,`After adding ${course.courseId} to semester ${semester}`)
        this.applyStateChange(changes)
      })

  }

  removeCourse = (surrogateId: string) => {
    let withState :CourseState[] | null = null
    if(this.currentStateIndex() < this.allStates().length){
      withState = this.currentState()?.filter(state => state.semesterPlanned != null) ?? null
    }
    const planId = this.route.snapshot.paramMap.get("planId")!
    this.planService.removeCourseFromPlan(planId,surrogateId,withState)
      .subscribe(changes => {
        const removed = this.courseStateById().get(surrogateId)!
        this.stateDescription.set(this.currentStateIndex() + 1,`After removing ${removed.courseId}`)
        this.applyStateChange(changes)
      })
  }

  applyStateChange = (stateChange :StateChange)=> {
    this.applyCourseStateChanges(stateChange.courseStateChanges)
    this.currentStateIndex.set(this.allStates().length - 1)
  }

  NO_CHANGE = null

  RESET = -1

  RESET_INITIALLY_AVAILABLE = -2



  applyCourseStateChanges = (courseStateChanges :ChangedCourseState[]) => {
    const courseChangeMap = new Map<string,ChangedCourseState>()
    courseStateChanges.forEach(newState => {
      courseChangeMap.set(newState.id,newState)
    })

    this.allStates.update(states => {
      const newStates = this.currentState()!.map(courseState => {
        return this.updateCourseStates(courseChangeMap, courseState);
      })
      states.push(newStates)
      return states.slice()
    })
  }

  private updateCourseStates = (courseChangeMap: Map<string, ChangedCourseState>, courseState: CourseState) =>  {
    if (courseChangeMap.has(courseState.id)) {
      const newState = courseChangeMap.get(courseState.id)!

      let newFirstSemester;
      let newSemesterPlanned;
      if (newState.firstSemesterPlannable == this.NO_CHANGE) {
        newFirstSemester = courseState.firstSemesterPlannable;
      } else if (newState.firstSemesterPlannable == this.RESET) {
        newFirstSemester = null;
      } else if (newState.firstSemesterPlannable == this.RESET_INITIALLY_AVAILABLE) {
        newFirstSemester = 0;
      } else {
        newFirstSemester = newState.firstSemesterPlannable;
      }

      if (newState.semesterPlanned == this.NO_CHANGE) {
        newSemesterPlanned = courseState.semesterPlanned;
      } else if (newState.semesterPlanned == this.RESET) {
        newSemesterPlanned = null;
      } else {
        newSemesterPlanned = newState.semesterPlanned;
      }
      return {...courseState, firstSemesterPlannable: newFirstSemester, semesterPlanned: newSemesterPlanned};
    } else {
      return courseState;
    }
  }

  protected readonly ROUTES = ROUTES;

  protected decrementStateIndex() {
    if(this.currentStateIndex() == 0) return;
    this.currentStateIndex.update((index) => index -= 1)
  }


  protected incrementStateIndex() {
    if(this.currentStateIndex() == this.allStates().length - 1) return;
    this.currentStateIndex.update((index) => index += 1)
  }

  protected toggleDisplay(displaySignal: WritableSignal<boolean>) {
    displaySignal.update(prev => !prev)
  }

  protected resetState() {
    this.planService.resetState(this.route.snapshot.paramMap.get("planId")!)
      .subscribe(stateChanges => {
        this.applyCourseStateChanges(stateChanges)
        this.currentStateIndex.set(this.allStates().length - 1)
        this.stateDescription.set(this.allStates().length - 1,"After resetting plan state")
      })
  }

  protected moveToPreviousState(){
    this.planService.applyPreviousState(
      this.route.snapshot.paramMap.get('planId')!,
      this.currentState()!
    )
      .subscribe(result => {
        if(result.status == HttpStatusCode.Ok){
          this.allStates.update(prev => {
            prev.push(prev[this.currentStateIndex()])
            return prev.slice()
          })
          this.currentStateIndex.set(this.allStates().length - 1)

        }
      })



  }
}


