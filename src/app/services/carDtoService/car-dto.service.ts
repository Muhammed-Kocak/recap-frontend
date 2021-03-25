import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailAndImagesDto } from 'src/app/models/CarDetailAndImagesDto';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { ItemResponseModel } from 'src/app/models/itemResponseModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingularResponseModel } from 'src/app/models/singularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDtoService {

  apiUrl:string="https://localhost:44332/api/";
  constructor(private httpClient:HttpClient) { }

  getCarDetailsById(carId : number) : Observable<SingularResponseModel<CarDto>>{
    let newPath = this.apiUrl+"cars/getbyiddetails?carId="+carId;
    return this.httpClient.get<SingularResponseModel<CarDto>>(newPath);
  }

  getCarImages(carId : number) : Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"carimages/getimagesbycar?CarId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  
  getCarDetailAndImagesDto(carId:Number):Observable<ItemResponseModel<CarDetailAndImagesDto>>{
    let newPath = this.apiUrl +'cars/getcarsdetail?carId='+carId;
    return this.httpClient.get<ItemResponseModel<CarDetailAndImagesDto>>(newPath);
  }
}
