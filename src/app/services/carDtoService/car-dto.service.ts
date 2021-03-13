import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDtoResponseModel } from 'src/app/models/carDtoResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDtoService {

  apiUrl:string="https://localhost:44332/api/cars/getcardetails";
  constructor(private httpClient:HttpClient) { }

  getCarDetails():Observable<CarDtoResponseModel>{
    return this.httpClient.get<CarDtoResponseModel>(this.apiUrl);
  }
}
