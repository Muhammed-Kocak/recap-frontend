import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDto } from 'src/app/models/carDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingularResponseModel } from 'src/app/models/singularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl:string="https://localhost:44332/api/cars/";

  constructor(private httpClient: HttpClient) {

  }

  getCars(): Observable<ListResponseModel<CarDto>> {
     let newPath: string = this.apiUrl + 'getcardetails';
     return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarById(id: number): Observable<SingularResponseModel<CarDto>> {
     let newPath: string = this.apiUrl + 'getbyid?id=' + id;
     return this.httpClient.get<SingularResponseModel<CarDto>>(newPath);
  }

  getCarsByBrandId(brandId: number): Observable<ListResponseModel<CarDto>> {
     let newPath: string = this.apiUrl + 'getcarsbybrand?id=' + brandId;
     return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarsByColorId(colorId: number): Observable<ListResponseModel<CarDto>> {
     let newPath: string = this.apiUrl + 'getcarsbycolor?id=' + colorId;
     return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }
}
