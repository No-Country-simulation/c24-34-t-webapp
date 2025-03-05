import { Injectable } from '@angular/core';
import {getCookie, removeCookie, setCookie} from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  saveUserID(userID:string){
    setCookie('userID', userID,{
      //configure when the cookie expired
      expires:365,
      //available for everything project paths
      path:'/'
    });
  }

  removeUserID(){
    removeCookie('userID');
  }

  getUserID(){
    const userID = getCookie('userID');
    return userID || '';
  }
}
