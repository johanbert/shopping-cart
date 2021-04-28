import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken:any;
  expireIn!:number;
  jsonKeyNames:any = {
    localStorageToken: 'token'
    }
  private tokenKeyName = 'token';
  private url = 'https://identitytoolkit.googleapis.com/v1/';
  private apiKey = 'AIzaSyAGiBMvfXv6ICksHcOBIbrslJWdFa8h5sU';
  private endpoints = {
    newUser :"accounts:signUp?key=",
    logInOut:"accounts:signInWithPassword?key="
  }

  constructor( private http: HttpClient) {
    this.readToken();
  }

  logOut(){
    localStorage.removeItem(this.jsonKeyNames.localStorageToken);
  }
  logIn( user: UserModel){
    const authData = {
      ...user,
      returnSecureToken:true
    };
    return this.http.post(
      `${ this.url }${ this.endpoints.logInOut }${ this.apiKey }`,
      authData
    ).pipe(
      map((res:any)=>{
        this.saveToken(res['idToken'],Number(res['expiresIn']))
        return res;
      })
    );
  }
  newUser( user: UserModel){
    const authData = {
      ...user,
      returnSecureToken:true
    };
    return this.http.post(
      `${ this.url }${ this.endpoints.newUser }${ this.apiKey }`,
      authData
    ).pipe(
      map((res:any)=>{
        this.saveToken(res['idToken'],Number(res['expiresIn']))
        return res;
      })
    );
  }

  saveToken(idToken: string,expireIn:number){
    this.userToken = idToken;
    localStorage.setItem(this.tokenKeyName,idToken);
    let tofday = new Date().setSeconds(expireIn).toString();
  }

  readToken(){
    if (localStorage.getItem(this.jsonKeyNames.localStorageToken)){
      this.userToken = localStorage.getItem(this.jsonKeyNames.localStorageToken);
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuthenticated(): boolean{
    return this.userToken.length > 2;
  }
}
