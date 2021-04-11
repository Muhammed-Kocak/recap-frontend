import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenModel } from 'src/app/models/tokenModel';
import { LocalStorageService } from '../services/localStorageService/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token: string | null = this.localStorageService.get(
      'token'
    );

    let newRequest: HttpRequest<any> = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${token}`
      ),
    });

    return next.handle(newRequest);
  }
}
