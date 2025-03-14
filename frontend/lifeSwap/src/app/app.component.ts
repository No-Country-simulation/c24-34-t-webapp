import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: '<router-outlet />',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lifeSwap';
}
