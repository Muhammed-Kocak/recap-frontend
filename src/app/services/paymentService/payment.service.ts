import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from 'src/app/models/rental';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44332/api/";

  constructor(private httpClient:HttpClient) { }
  pay(rental:Rental,amount:Number):Observable<ResponseModel>{
    let path = this.apiUrl+"rentals/paymentadd";
    rental.returnDate = undefined;
    return this.httpClient.post<ResponseModel>(path,{payment:{amount:amount},rental:rental});
  }
}
