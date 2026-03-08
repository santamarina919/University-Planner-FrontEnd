import {Component, computed, input, Input} from '@angular/core';
import {RequirementNode} from '../../../plan-page';
import {CourseState} from '../../../../service/plan-service';
import {Course} from '../../../../components/course/course';

@Component({
  selector: 'app-requirement',
  imports: [
    Course
  ],
  templateUrl: './requirement.html',
  styleUrl: './requirement.css',
})
export class Requirement {
  requirement = input.required<RequirementNode>()

  courseStates = input.required<Map<string,CourseState>>()

  requirementMap = input.required<Map<string,boolean>>()

  type = computed(() => this.requirement().type)

  completed = computed(() => {
    let completed = false
    if(this.type() == 'AND'){
      completed = this.andCompletionFunction()
    }
    else {
      completed = this.orCompletionFunction()
    }
    this.requirementMap().set(this.requirement().id,completed)
    return completed
  })

  private orCompletionFunction() {
    let reqCompleted = false;
    this.requirement().leafCourses.forEach((id) => {
      const state = this.courseStates().get(id)
      if(state != undefined){
        reqCompleted = state.semesterPlanned != null
      }
    })

    if(reqCompleted){
      return true
    }

    this.requirement().childRequirements.forEach((req) => {
      const completed = this.requirementMap().get(req.id)
      if(completed != undefined && completed){
        reqCompleted = true
      }
    })

    return reqCompleted
  }

  private andCompletionFunction() {
    let allCompleted = true
    this.requirement().leafCourses.forEach((id) => {
      const state = this.courseStates().get(id)
      allCompleted = allCompleted && state != undefined && state.semesterPlanned != null
    })

    this.requirement().childRequirements.forEach((req) => {
      const completed = this.requirementMap().get(req.id)
      if(completed != undefined && !completed){
        allCompleted = false
      }
    })

    return allCompleted


  }

  public typeStr() {
    if(this.type() == 'AND'){
      return 'Complete All'
    }
    else {
      return 'Complete at least one below'
    }
  }



}
