import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class CatApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'x-api-key': 'live_xzqiATMoX9JoRJmUezRFqDwCkamahejdXNLIsRtSVV5YuBTE6JplnfCJuLA5gpbT'
      }
    });
    return next.handle(modifiedRequest);
  }
}
