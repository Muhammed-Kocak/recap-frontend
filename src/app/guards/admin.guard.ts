import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from '../services/authService/auth.service';
import { LocalStorageService } from '../services/localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userMail: string | null = this.localStorageService.get(
      'userMail'
    );
    return this.authService.isAuthenticated(userMail, ['admin']).pipe(
      map((response) => {
        return response.success;
      }),
      catchError(() => {
        this.router.navigate(['']);
        this.toastrService.info('Bu sayfaya erişmek için yetkiniz yok.');
        return of(false);
      })
    );
  }
}
