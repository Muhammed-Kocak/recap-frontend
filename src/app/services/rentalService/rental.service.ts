import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { ResponseModel } from 'src/app/models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl= `${environment.apiUrl}/rentals`;
  rentalCheckout?: Rental;

  constructor(private httpClient: HttpClient) {
     this.getRentals();
  }

  getRentals(): Observable<ListResponseModel<RentalDto>> {
     return this.httpClient.get<ListResponseModel<RentalDto>>(this.apiUrl+"/getrentaldetails");
  }
  
  
  isRentable(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/isrentable`,
      rental
    );
  }

  checkFindeksScoreSufficiency(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/checkfindeksscoresufficiency`,
      rental
    );
  }

  add(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/add`,
      rental
    );
  }

}