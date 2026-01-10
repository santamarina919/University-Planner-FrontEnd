import {Component, inject, input} from '@angular/core';
import {Router} from '@angular/router';
import {routeToPlan} from '../../app.routes';

@Component({
  selector: 'app-back-navigation',
  imports: [],
  templateUrl: './back-navigation.html',
  styleUrl: './back-navigation.css',
})
export class BackNavigation {

  route = input.required<string>()

  router = inject(Router)

  navigateToRoute(){
    document.startViewTransition(async () => {
      this.router.navigate([this.route()])
    })
  }
}
