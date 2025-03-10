import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class PasswordValidators {
  static passwordMatchValidator(): ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password && confirmPassword && password !== confirmPassword
      ? {passwordMisMatch:true}
        : null;
    }
  }
}
