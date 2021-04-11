import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/creditCard';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = `${environment.apiUrl}/creditcards`

  constructor(private httpClient: HttpClient) { }

  getAllByCustomerId(
    customerId: number
  ): Observable<ListResponseModel<CreditCard>> {
    return this.httpClient.get<ListResponseModel<CreditCard>>(
      `${this.apiUrl}/getallbycustomerid`,
      {
        params: {
          customerId: customerId.toString(),
        },
      }
    );
  }

  add(creditCard: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/add`,
      creditCard
    );
  }

  delete(creditCard: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/delete`,
      creditCard
    );
  }
}
