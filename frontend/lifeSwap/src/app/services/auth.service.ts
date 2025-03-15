import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {SignIn, SignUp, User} from '../models/User';
import {TokenService} from './token.service';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }
  signIn(signInData: SignIn) {
    return this.http.post<User>(`${environment.url}auth/sign-in`, signInData).
      pipe(
      tap(response  => this.tokenService.saveToken(response.accessToken))
    );
  }
  signUp(signUpData: SignUp) {
    return this.http.post<User>(`${environment.url}auth/sign-up`,signUpData).
      pipe(
        tap(response => this.tokenService.saveToken(response.accessToken))
        );
  }
  verifyToken(){
    return this.http.get<User>(`${environment.url}auth/verify-token`);
  }
}
