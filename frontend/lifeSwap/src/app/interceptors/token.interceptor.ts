import {HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {TokenService} from '../services/token.service';

export const tokenInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next) => {
  request = addToken(request);
  return next(request);
};
const addToken = (request: HttpRequest<unknown>) => {
  const authToken = inject(TokenService).getToken();
  if (authToken) {
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`)
    })
    return authRequest;
  }
  return request;
}
