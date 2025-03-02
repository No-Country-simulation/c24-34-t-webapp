import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import {SignIn} from '../../models/User';
import { get_icons } from '../../models/get_icons';
import { CommonModule } from '@angular/common';
import { Color_btn } from '../../models/color_btn';
import { FormsModule, NgForm } from '@angular/forms';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, FaIconComponent],
  standalone: true,
  templateUrl: './login.component.html'
})
export class LoginComponent {
  get_icons = get_icons;
  color_btn = Color_btn

  constructor(private authService: AuthService,
              private routes:Router) {
  }
  ngOnInit(){}

  logIn(signInData: SignIn){
    this.authService.signIn(signInData).subscribe(dataUser =>
    {
      //TODO manejar los estados, este caso es de exito
      //la idea es que envie por aca el accessToken del user
      this.routes.navigate(['home/',dataUser.email]);
    })
  }

  onSubmit(f: NgForm) {
    const { email, password } = f.value;
    const signInData:SignIn = {
      email:email,
      password:password
    }
    this.logIn(signInData)
  }
}
