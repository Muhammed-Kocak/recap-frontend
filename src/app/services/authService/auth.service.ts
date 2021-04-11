import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingularResponseModel } from 'src/app/models/singularResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { UserDetail } from 'src/app/models/userDetail';
import { AppState } from 'src/app/store/app.reducer';
import { deleteUserDetail, setUserDetail } from 'src/app/store/auth/auth.actions';
import { LocalStorageService } from '../localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  administratorOrUser:boolean=false;
  userMail: string | null = this.localStorageService.get('userMail');

  apiUrl = 'https://localhost:44332/api/auth';

  userDetail$: Observable<UserDetail | undefined> = this.store
    .select((s) => s.appAuth)
    .pipe(map((b) => b.userDetail));

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
    ) { }

  login(user:LoginModel):Observable<SingularResponseModel<TokenModel>>{
    return this.httpClient.post<SingularResponseModel<TokenModel>>(this.apiUrl+"/login",user)
  }

  register(user:RegisterModel):Observable<SingularResponseModel<TokenModel>>{
    return this.httpClient.post<SingularResponseModel<TokenModel>>(this.apiUrl+"/register",user)
  } 

  logout() {
    this.localStorageService.remove('token');
    this.localStorageService.remove('userMail');
    this.deleteUserDetail();
  }

  isAuthenticated(
    userMail?: string | null,
    requiredRoles?: string[]
  ): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(
      `${this.apiUrl}/isauthenticated`,
      {
        params:
          userMail && requiredRoles
            ? {
                userMail: userMail,
                requiredRoles: requiredRoles.join(','),
              }
            : {},
      }
    );
  }

  setUserDetail(userDetail: UserDetail) {
    this.store.dispatch(setUserDetail({ userDetail: userDetail }));
  }

  deleteUserDetail() {
    this.store.dispatch(deleteUserDetail());
  }
  
  managerLoggedIn(){
    if (this.userMail!==null) {
      if (this.isAuthenticated(this.userMail,["admin"]).subscribe(response=>response.success)) {
        return this.administratorOrUser=true;
      }else{
        return this.administratorOrUser=false;
      }
    }else{
      return this.administratorOrUser=false
    }
  }
}
