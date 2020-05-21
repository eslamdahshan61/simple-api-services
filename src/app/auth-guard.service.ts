import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot
  } from "@angular/router";
  import { Injectable } from "@angular/core";
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { CookieService } from 'ngx-cookie-service';
  
  
  
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    state:any;
    constructor(private router: Router,private cookieService: CookieService ) {
  
  
      
     }
     
  
     
      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  
  
        if (this.cookieService.get('user_token')) {
        
        return true;
        } else {
          this.router.navigate(['/login'], {
            queryParams: {
              return: state.url
            }
          });
          return false;
        }
  
      }
    }
    
  