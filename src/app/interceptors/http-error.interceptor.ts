import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((responseError: HttpErrorResponse) => {
        if (responseError.error.Errors && responseError.error.Error.length > 0)
          responseError.error.Errors.forEach((error: any) =>
            this.toastrService.error(error.ErrorMessage)
          );
        else if (responseError.error.message)
          this.toastrService.error(responseError.error.message);
        else this.toastrService.error('Bir sorun oluştu.');

        console.log(responseError); 

        return throwError(responseError);
      })
    );
  }
}