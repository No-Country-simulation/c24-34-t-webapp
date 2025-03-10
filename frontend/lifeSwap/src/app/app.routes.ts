import { Routes } from '@angular/router';
import { CreateRoutineComponent } from './pages/create-routine/create-routine.component';
import { HomeComponent } from './pages/home/home.component';
import { FilterComponent } from './components/filter/filter.component';
import {LoginComponent} from './pages/login/login.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: 'create-routine',
    component: CreateRoutineComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'filter',
    component: FilterComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  }
];
