import { logging } from 'protractor';
import { AuthenticationService } from './authentication.service';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

       intercept(req, next) {
        // if there is Anonymous header, don't handle the request, and remove this flag
        if (req.headers.get('Anonymous') === 'Anonymous') {
        const newHeaders = req.headers.delete('Anonymous')
        const newRequest = req.clone({ headers: newHeaders });
        return next.handle(newRequest);
        } else {
                let authService = this.injector.get(AuthenticationService)
        const newRequest = req.clone({ setHeaders: { Authorization: authService.get_user_info().token } });
        return next.handle(newRequest);
        }
    }

}
