import { Routes } from '@angular/router';
import {SignUp} from './sign-up/sign-up';
import {HomePage} from './home-page/home-page';


export const routes: Routes = [
  {path : '', component : HomePage},
  {path : 'signup', component : SignUp}
];
