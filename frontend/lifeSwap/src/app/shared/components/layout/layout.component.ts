import { Component } from '@angular/core';
import {NavbarComponent} from '../../../components/navbar/navbar.component';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    NavbarComponent,
    RouterModule
  ],
  standalone: true,
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

}
