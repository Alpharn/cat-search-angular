import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from "rxjs";

/**
 * CatApiInterceptor intercepts HTTP requests and adds an API key to the headers.
 * The interceptor clones the original HTTP request, sets the new headers including the API key, 
 * and passes the modified request to the next handler in the chain.
 */
@Injectable()
export class CatApiInterceptor implements HttpInterceptor {

  constructor() {}

  /**
   * Intercepts an outgoing HTTP request, clones it and adds an API key to the headers,
   * then forwards it to the next request handler.
   *
   * @param request - The outgoing request object to be intercepted.
   * 
   * @param next - The next interceptor in the chain, or the backend if no interceptors remain.
   * 
   * @returns An Observable of the HTTP event stream.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'x-api-key': 'live_xzqiATMoX9JoRJmUezRFqDwCkamahejdXNLIsRtSVV5YuBTE6JplnfCJuLA5gpbT'
      }
    });
    return next.handle(modifiedRequest);
  }
}
