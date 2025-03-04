import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {User} from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userID: string = '';

  constructor(private http:HttpClient) {}

  gerUserByEmail(email:string) {
    return this.http.get<User>(`${environment.url}users/email/${email}`);
  }
}
