import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from '../services/token.service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = inject(TokenService);
  const router: Router = inject(Router);
  if(!token.getToken()){
    router.navigate(['/login'])
    return false;
  }
  return true;
};
