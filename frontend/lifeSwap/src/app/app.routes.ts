import { Routes } from '@angular/router';
import { CreateRoutineComponent } from './pages/create-routine/create-routine.component';
import { HomeComponent } from './pages/home/home.component';
import { FilterComponent } from './components/filter/filter.component';
import {LoginComponent} from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'create-routine',
    component: CreateRoutineComponent,
  },
  {//TODO esta ruta es hija de la ruta login
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
  }
];
