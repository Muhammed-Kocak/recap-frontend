import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Brand } from 'src/app/models/brand';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = 'https://localhost:44332/api/brands';

  constructor(private httpClient: HttpClient) {
  }

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + "/getall");
  }
  add(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", brand)
  }
  update(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + '/update',
      brand
    );
  }
  delete(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + '/delete',
      brand
    );
  }
  getBrandById(brandId: number): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + '/getbyid?id=' + brandId;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
}
