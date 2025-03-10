import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {get_icons} from '../../models/get_icons';
import { Color_btn } from '../../models/color_btn';
import {CommonModule} from '@angular/common';
import {FormErrorMessageComponent} from '../form-error-message/form-error-message.component';
import {SignIn, SignUp} from '../../models/User';
import {Router, RouterLink} from '@angular/router';
import {PasswordValidators} from '../../validators/password-validators';

@Component({
  selector: 'app-auth-form',
  imports: [
    ReactiveFormsModule,
    FaIconComponent,
    CommonModule,
    FormErrorMessageComponent,
    RouterLink
  ],
  standalone: true,
  templateUrl: './auth-form.component.html'
})
export class AuthFormComponent {
  move: boolean = false;
  get_icons = get_icons;
  isVisiblePassword: boolean = false;
  isVisibleConfirmPassword: boolean = false;
  color_btn = Color_btn;
  @Input() formFields!: {
    name: string;
    type: string;
    validators: any[];
    placeholder: string;
    iconRight: string;
    eyeIcon?: boolean;
  }[];
  @Input() isLoginForm: boolean = true;
  form!: FormGroup;
  @Output() formData = new EventEmitter<SignUp & SignIn>();
  @Output() isInitStatus = new EventEmitter<boolean>();


  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({},
      {validators: PasswordValidators.passwordMatchValidator()}
  );
    this.formFields.forEach(field => {
      this.form.addControl(field.name, this.formBuilder.control('', field.validators));
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.formData.emit(this.form.value);
    }
  }

  setStatus() {
    this.isInitStatus.emit(true);
  }

  navigate() {
    this.move = true;
    setTimeout(() => {
      this.router.navigate([this.isLoginForm ? '/signup' : '/login']);
    }, 800);

  }

  isVisible(field: string) {
    if (field === 'password'){
      this.isVisiblePassword = !this.isVisiblePassword;
    }else if(field === 'confirmPassword') {
      this.isVisibleConfirmPassword = !this.isVisibleConfirmPassword;
    }
  }

  getType(field:string) {
    if (field === 'password' && this.isVisiblePassword){
      return 'text';
    }else if(field === 'confirmPassword' && this.isVisibleConfirmPassword) {
      return 'text';
    }
    return 'password';
  }

}
