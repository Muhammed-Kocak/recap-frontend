import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from 'src/app/models/carImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';

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
}
