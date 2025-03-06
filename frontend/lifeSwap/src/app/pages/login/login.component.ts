import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import {SignIn} from '../../models/User';
import { get_icons } from '../../models/get_icons';
import { CommonModule } from '@angular/common';
import { Color_btn } from '../../models/color_btn';
import { FormsModule, NgForm } from '@angular/forms';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import { RequestStatus } from '../../models/request-status.model';
import {FormErrorMessageComponent} from '../../components/form-error-message/form-error-message.component';
import { ModelMessagesComponent } from '../../components/model-messages/model-messages.component';
import {Dialog} from '@angular/cdk/dialog';
import {UsersService} from '../../services/users.service';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, FaIconComponent, FormErrorMessageComponent],
  standalone: true,
  templateUrl: './login.component.html'
})
export class LoginComponent {
  get_icons = get_icons;
  color_btn = Color_btn
  status: RequestStatus = 'init';
  isVisible:boolean = false;


  constructor(private authService: AuthService,
              private routes:Router,
              private dialog: Dialog,
              private usersService: UsersService,
              private tokenService: TokenService) {
  }

  onSubmit(f: NgForm) {
    if (f.valid){
      const { email, password } = f.value;
      const signInData:SignIn = {
        email:email.toLowerCase(),
        password:password
      }
      this.logIn(signInData)
    }
  }

  logIn(signInData: SignIn){
    //set status to loading while waiting for the backend response
    this.status='loading';
    this.openDialog();
    this.authService.signIn(signInData).subscribe({
      next: (dataUser) => {
        this.status = 'success';
        this.dialog.closeAll();
        //save the user's token in cookies
        this.tokenService.saveToken(dataUser.accessToken);
        //navigate to the home component with the user's email to display their routines
        this.routes.navigate(['home/']);
      },
      error:(err) => {
        this.dialog.closeAll();
        if (err.status === 400){
          //set status to badRequest when there is an error with credentials
          this.status = 'badRequest';
          //no open dialog, this error is maneged by form-message-error component
        }
        else if(err.status === 401) {
          //set status to Unauthorized when there is an error with credentials
          this.status = 'unauthorized';
          //no open dialog, this error is maneged by form-message-error component
        }
        else if (err.status === 404){
          //set status to notFound when a 404 error occurs
          this.status = "notFound";
          //open a dialog with a message about the 404 error
          this.openDialog();
          //navigate to the login component when there is a 404 error
          this.routes.navigate(["/login"])
        }
      }
    });
  }
  openDialog() {
    this.dialog.open(ModelMessagesComponent,{
      //send status to the Model Messages component
      data: {
        status: this.status
      },
      minWidth: '320px',
      backdropClass: 'bg-gray-50/90',
      disableClose: true
    })
  }

  setStatus() {
    this.status ="init";
  }
}
