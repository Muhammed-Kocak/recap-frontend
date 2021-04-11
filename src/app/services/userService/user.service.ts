import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingularResponseModel } from 'src/app/models/singularResponseModel';
import { UserDetail } from 'src/app/models/userDetail';
import { UserDetailUpdateModel } from 'src/app/models/userDetailUpdateModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiControllerUrl = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) {}

  getUserDetailByEmail(
    userMail: string
  ): Observable<SingularResponseModel<UserDetail>> {
    return this.httpClient.get<SingularResponseModel<UserDetail>>(
      `${this.apiControllerUrl}/getuserdetailbymail`,
      {
        params: {
          userMail: userMail,
        },
      }
    );
  }

  updateUserDetails(
    userDetailUpdateModel: UserDetailUpdateModel
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerUrl}/updateuserdetails`,
      userDetailUpdateModel
    );
  }
}
