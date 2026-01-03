import {Component, computed, input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-arrow',
  imports: [
    NgClass
  ],
  templateUrl: './arrow.html',
  styleUrl: './arrow.css',
})
export class Arrow{

  direction = input.required<"right" | "left">()

  clickable = input.required<true | false>()

  clickableClass = computed<string>(() => this.clickable() ? 'clickable' : '')



}
