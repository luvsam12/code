import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor( private AuthenticationService:AuthenticationService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

      if(this.AuthenticationService.isLoggedIn()) {
      return true;
       }
       this.router.navigate(['/login']);
       return false;
   }

}
