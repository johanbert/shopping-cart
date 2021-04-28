import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  jsonKeyNames:any = {
    navigateByUrlLogIn:'/login'
  }
  constructor(private authService: AuthService,
              private router:Router){}
              
  canActivate(): boolean {
    console.log('Guard');
    if (this.authService.isAuthenticated()){
      return true;
    } else{
      this.router.navigateByUrl(this.jsonKeyNames.navigateByUrlLogIn);
      return false; 
    }
    
  }
  
}
