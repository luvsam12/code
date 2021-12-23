import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
 


export interface CancomponentLeave{

  canleave: () => boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthdeactiveGuard implements CanDeactivate<CancomponentLeave> {
   canDeactivate(component: CancomponentLeave) {
       if(component.canleave){
      return component.canleave();
     }
     return true;

  }

}
