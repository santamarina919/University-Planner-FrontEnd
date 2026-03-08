import {Component, computed, input, Input, signal} from '@angular/core';
import {DegreeNode, RequirementNode} from '../../plan-page';
import {Requirement} from './requirement/requirement';
import {CourseState} from '../../../service/plan-service';
import {map} from 'rxjs';

@Component({
  selector: 'app-degree',
  imports: [
    Requirement
  ],
  templateUrl: './degree.component.html',
  styleUrl: './degree.component.css',
})
export class DegreeComponent {
  degree = input.required<DegreeNode>()

  requirementMap = computed(() => {
    const completionMap = new Map<string,boolean>()
    this.addAllRequirements(this.degree().requirement,completionMap)
    return completionMap
  })

  private addAllRequirements(requirement: RequirementNode, completionMap: Map<string, boolean>) {
    completionMap.set(requirement.id,false)
    requirement.childRequirements.forEach(req => {
      this.addAllRequirements(req,completionMap)
    })
  }

  courseStates = input.required<Map<string,CourseState>>()

  showRootRequirement = signal(false)

  protected toggleRootReq() {
    this.showRootRequirement.set(!this.showRootRequirement())
  }

  protected isCompletedStr() {
  }
}
