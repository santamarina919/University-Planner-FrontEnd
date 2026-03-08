import {Component, computed, effect, inject, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import UserService from './service/user-service';
import {ROUTES} from './app.routes';
import {ExplorePage} from './explore-page/explore-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  signedIn = signal(false)

  userService = inject(UserService)

  constructor() {
  }

  public signedInText() {
    if(this.signedIn()){
      return "Profile"
    }
    else {
      return "Log In/Sign Up"
    }
  }

  protected readonly title = signal('PlanAUniversity');
  protected readonly ROUTES = ROUTES;
  protected readonly ExplorePage = ExplorePage;
}
