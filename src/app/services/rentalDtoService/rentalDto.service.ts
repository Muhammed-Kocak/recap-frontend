import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDtoResponseModel } from 'src/app/models/rentalDtoResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalDtoService {

  apiUrl:string="https://localhost:44332/api/rentals/getrentaldetails";

  constructor(private httpClient:HttpClient) { }

  getRentalDto():Observable<RentalDtoResponseModel>{
    return this.httpClient.get<RentalDtoResponseModel>(this.apiUrl);
  }
}
