import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import {SignIn} from '../../models/User';

@Component({
  selector: 'app-login',
  imports: [],
  standalone: true,
  templateUrl: './login.component.html'
})
export class LoginComponent {
  //TODO es para probar ya que aun no hare el login
  signInData: SignIn = {
    email : 'rosanneclopez@gmail.com',
    password: 'C@l@st3._.'
  }

  constructor(private authService: AuthService,
              private routes:Router) {
  }
  ngOnInit(){}

  //TODO email and password come from login form
  logIn(signInData: SignIn){
    this.authService.signIn(this.signInData).subscribe(dataUser =>
    {
      //TODO en caso de exito
      this.routes.navigate(['home/',dataUser.email]);
    })
  }

}
