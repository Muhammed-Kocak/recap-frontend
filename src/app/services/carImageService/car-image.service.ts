import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from 'src/app/models/carImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl= 'https://localhost:44332/api/carimages/';
  constructor(private httpClient: HttpClient) {
  }

  getPhotosByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
     let newPath = this.apiUrl + 'getimagesbycar?carId=' + carId;
     return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  add(carImageFile:FormData):Observable<ResponseModel>{
    let path = this.apiUrl + "carimages/add";
    return this.httpClient.post<ResponseModel>(path, carImageFile);
  }

  delete(carImage:CarImage):Observable<ResponseModel>{
    let path = this.apiUrl + "carimages/delete";
    return this.httpClient.post<ResponseModel>(path, carImage);
  }
  upload(carImageAdd:CarImage): Observable<ResponseModel> {
    let newPath = this.apiUrl + "carimages";
    return this.httpClient.post<ResponseModel>(newPath,carImageAdd);
  }
  update(carImage:CarImage):Observable<ResponseModel>{
    let path = this.apiUrl + "carimages/update";
    return this.httpClient.post<ResponseModel>(path, carImage);
  }
}
