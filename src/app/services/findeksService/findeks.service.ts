import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Findeks } from 'src/app/models/findeks';
import { SingularResponseModel } from 'src/app/models/singularResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {
  apiUrl = `${environment.apiUrl}/findeks`;

  constructor(private httpClient: HttpClient) {}

  getByCustomerId(
    customerId: number
  ): Observable<SingularResponseModel<Findeks>> {
    return this.httpClient.get<SingularResponseModel<Findeks>>(
      `${this.apiUrl}/getbycustomerid`,
      {
        params: {
          customerId: customerId.toString(),
        },
      }
    )
  }
}
