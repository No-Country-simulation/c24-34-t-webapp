import { Component } from '@angular/core';
import {Validators} from '@angular/forms';
import {AuthFormComponent} from '../../components/auth-form/auth-form.component';
import {SignUp} from '../../models/User';
import {AuthService} from '../../services/auth.service';
import {RequestStatus} from '../../models/request-status.model';
import {ModelMessagesComponent} from '../../components/model-messages/model-messages.component';
import {Dialog} from '@angular/cdk/dialog';
import {Router} from '@angular/router';
import {FormErrorMessageComponent} from '../../components/form-error-message/form-error-message.component';

@Component({
  selector: 'app-sign-up',
  imports: [
    AuthFormComponent,
    FormErrorMessageComponent
  ],
  standalone: true,
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  formFields = [
    {
      name:'username',
      type:'text',
      validators:[Validators.required, Validators.minLength(6), Validators.maxLength(12)],
      placeholder:'Enter your username',
      iconRight:'faUser',
      eyeIcon:false,
    },
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
      validators:
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          //The password must contain at least one special character, one number and one uppercase letter
          Validators.pattern(/(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/),
        ],
      placeholder:'Enter your password',
      iconRight:'faLock',
      eyeIcon:true,
    },
    {
      name:'confirmPassword',
      type:'password',
      validators:[Validators.required],
      placeholder:'Confirm your password',
      iconRight:'faLock',
      eyeIcon:true,
    },
  ]
  isValidForm: boolean = true;
  status:RequestStatus = 'init'


  constructor(private authService:AuthService, private dialog: Dialog, private router: Router) {
  }

  setDataSignUp(formData: SignUp) {
    const { username, email, password, confirmPassword, } = formData;
    this.isValidForm = true;

    const signUpData:SignUp = {
      username:username,
      email:email.toLowerCase(),
      password:password,
      confirmPassword: confirmPassword
    }
    this.signUp(signUpData)
  }

   signUp(signUpData: SignUp) {
     //set status to loading while waiting for the backend response
     this.status='loading';
     this.openDialog();
    this.authService.signUp(signUpData).subscribe ({
      next: () => {
        this.status = 'success';
        this.dialog.closeAll();
        //navigate to the home component with the user's email to display their routines
        this.router.navigate(['/create-routine']);
      }, error:(err)=>{
        this.dialog.closeAll();
        if (err.status === 400){
          //set status to badRequest when there is an error with credentials
          this.status = 'badRequest';
          //no open dialog, this error is maneged by form-message-error component
        }
        else if (err.status === 404){
          //set status to notFound when a 404 error occurs
          this.status = "notFound";
          //open a dialog with a message about the 404 error
          this.openDialog();
          //navigate to the login component when there is a 404 error
          this.router.navigate(["/signup"])
        }
        else if (err.status === 409){
          //set status to conflict when user with this email already exists
          this.status = "conflict";
          //no open dialog, this error is maneged by form-message-error component
        }
      }
    })
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
}
