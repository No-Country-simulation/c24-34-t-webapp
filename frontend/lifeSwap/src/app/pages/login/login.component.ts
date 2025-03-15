import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import {SignIn} from '../../models/User';
import { get_icons } from '../../models/get_icons';
import { Validators } from '@angular/forms';
import { RequestStatus } from '../../models/request-status.model';
import {FormErrorMessageComponent} from '../../components/form-error-message/form-error-message.component';
import { ModelMessagesComponent } from '../../components/model-messages/model-messages.component';
import {Dialog} from '@angular/cdk/dialog';
import {TokenService} from '../../services/token.service';
import {AuthFormComponent} from '../../components/auth-form/auth-form.component';

@Component({
  selector: 'app-login',
  imports: [AuthFormComponent, FormErrorMessageComponent],
  standalone: true,
  templateUrl: './login.component.html'
})
export class LoginComponent {
  isValidForm:boolean = false;
  get_icons = get_icons;
  status: RequestStatus = 'init';
  formFields = [
    {
      name:'email',
      type:'email',
      validators:[Validators.required, Validators.email],
      placeholder:'Enter your email',
      iconRight:'faEnvelope',
      eyeIcon:false,
    },
    {
      name:'password',
      type:'password',
      validators:[Validators.required],
      placeholder:'Enter your password',
      iconRight:'faLock',
      eyeIcon:true,
    },
    ]

  constructor(private authService: AuthService,
              private routes:Router,
              private dialog: Dialog,
              private tokenService: TokenService) {
  }

  setDataLogin(formData: SignIn) {
    const { email, password } = formData;
    this.isValidForm = true;
    const signInData:SignIn = {
      email:email.toLowerCase(),
      password:password
    }
    this.logIn(signInData)
  }

  logIn(signInData: SignIn){
    //set status to loading while waiting for the backend response
    this.status='loading';
    this.openDialog();
    this.authService.signIn(signInData).subscribe({
      next: () => {
        this.status = 'success';
        this.dialog.closeAll();
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
