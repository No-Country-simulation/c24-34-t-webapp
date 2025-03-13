import { Routes } from '@angular/router';
import { CreateRoutineComponent } from './pages/create-routine/create-routine.component';
import { HomeComponent } from './pages/home/home.component';
import { FilterComponent } from './components/filter/filter.component';
import {LoginComponent} from './pages/login/login.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {authGuard} from './guards/auth.guard';


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
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'create-routine',
    component: CreateRoutineComponent,
    canActivate: [authGuard]
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
