import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingularResponseModel } from 'src/app/models/singularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44332/api/cars/";

  constructor(private httpClient: HttpClient) {

  }

  carAdd(car:Car):Observable<ResponseModel>{
   let newPath = this.apiUrl+"add"
   return this.httpClient.post<ResponseModel>(newPath,car);
 }
 carUpdate(car:Car):Observable<ResponseModel>{
   let newPath=this.apiUrl+"update";
   return this.httpClient.post<ResponseModel>(newPath,car);
 }
 carDelete(car:Car):Observable<ResponseModel>{
   let newPath=this.apiUrl+"delete";
   return this.httpClient.post<ResponseModel>(newPath,car);
 }
  getCars(): Observable<ListResponseModel<CarDto>> {
     let newPath: string = this.apiUrl + 'getcarsdetail';
     return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }
  getCarByBrandAndColor(brandId:Number,colorId:Number):Observable<ListResponseModel<CarDto>>{
   let newPath = this.apiUrl +`cars/getbybrandandcolor?brandId=${brandId}&colorid=${colorId}`;
   return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
}
  getCarDtoById(id: number): Observable<SingularResponseModel<CarDto>> {
     let newPath: string = this.apiUrl + 'getbyid?id=' + id;
     return this.httpClient.get<SingularResponseModel<CarDto>>(newPath);
  }
  getCarById(id: number): Observable<SingularResponseModel<Car>> {
   let newPath: string = this.apiUrl + 'getbyid?id=' + id;
   return this.httpClient.get<SingularResponseModel<Car>>(newPath);
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
