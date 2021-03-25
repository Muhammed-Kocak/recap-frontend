import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { RentalDto } from 'src/app/models/rentalDto';

@Injectable({
  providedIn: 'root'
})
export class RentalDtoService {

  apiUrl="https://localhost:44332/api/rentals/getrentaldetails";

  constructor(private httpClient:HttpClient) { }

  getRentalDto():Observable<ListResponseModel<RentalDto>>{
    return this.httpClient.get<ListResponseModel<RentalDto>>(this.apiUrl);
  }
}
