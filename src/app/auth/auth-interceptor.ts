import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if(this.authService.apiKey){
      const authRequest = req.clone({
        headers: req.headers.set('x-api-key', this.authService.apiKey)
      });
      return next.handle(authRequest);
    }
    return next.handle(req.clone());
  };
}
