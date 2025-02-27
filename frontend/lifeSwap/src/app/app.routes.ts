import { Routes } from '@angular/router';
import { CreateRoutineComponent } from './pages/create-routine/create-routine.component';
import {HomeComponent} from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'create-routine',
    component: CreateRoutineComponent,
  },
  {
    path: 'home/:id',
    component: HomeComponent
  }
];
