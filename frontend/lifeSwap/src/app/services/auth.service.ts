import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {SignIn, User} from '../models/User';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }
  signIn(signInData: SignIn) {
    return this.http.post<User>(`${environment.url}auth/sign-in`, signInData);
  }
  verifyToken(){
    const token = this.tokenService.getToken();
    return this.http.get<User>(`${environment.url}auth/verify-token`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
  }
}
