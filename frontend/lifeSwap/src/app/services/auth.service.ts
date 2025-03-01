import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {SignIn, User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }
  signIn(signInData: SignIn) {
    return this.http.post<User>(`${environment.url}auth/sign-in`, signInData);
  }
}
