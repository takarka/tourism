import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq;
    if (this.tokenService.isUserAuth()) {
      authReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Token ' + this.tokenService.getToken()
        ),
      });
    } else {
      authReq = req.clone();
    }

    return next.handle(authReq).pipe(
      tap(
        (event: any) => {
          if (event instanceof HttpResponse) {
            console.log('Server response');
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('Unauthorized');
            }
          }
        }
      )
    );
  }
}
