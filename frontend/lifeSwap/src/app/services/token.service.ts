import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token:string){
    setCookie('token', token,{
      //configure when the cookie expired
      expires:365,
      //available for everything project paths
      path:'/'
    });
  }
  getToken(){
    const token = getCookie('token');
    return token;
  }
  removeToken(){
    removeCookie('token');
  }
}
