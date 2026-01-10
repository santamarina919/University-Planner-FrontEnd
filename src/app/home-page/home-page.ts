import { Component } from '@angular/core';
import {ROUTES} from '../app.routes';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  protected readonly ROUTES = ROUTES;
}
