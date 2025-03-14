import { Component } from '@angular/core';
import {BtnDisplayList} from '../btn-display-list/btn-display-list';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {get_icons} from '../../models/get_icons';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    BtnDisplayList,
    FaIconComponent,
    NgClass
  ],
  standalone: true,
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
get_icons = get_icons;


  constructor(private tokenService: TokenService, private router: Router) {
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['login'])
  }
}
