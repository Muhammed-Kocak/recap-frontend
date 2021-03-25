import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl= 'https://localhost:44332/api/rentals';

  constructor(private httpClient: HttpClient) {
     this.getRentals();
  }

  getRentals(): Observable<ListResponseModel<RentalDto>> {
     return this.httpClient.get<ListResponseModel<RentalDto>>(this.apiUrl+"/getrentaldetails");
  }
  
  rentalCar(rental:Rental):Observable<ResponseModel>{
    let path = this.apiUrl+"/add";
      return this.httpClient.post<ResponseModel>(path,rental);
  }
  
}