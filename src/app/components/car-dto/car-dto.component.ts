import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CarDtoService } from 'src/app/services/carDtoService/car-dto.service';
import { CarImageService } from 'src/app/services/carImageService/car-image.service';

@Component({
  selector: 'app-car-dto',
  templateUrl: './car-dto.component.html',
  styleUrls: ['./car-dto.component.css']
})
export class CarDtoComponent implements OnInit {
 
  // @ts-ignore
  carDetail: CarDto;
  carImages: CarImage[] = [];
  imageBaseUrl = "https://localhost:44332/Images/";

  constructor(
     private activatedRoute: ActivatedRoute,
     private carImageService: CarImageService,
     private carDtoService:CarDtoService) {
  }

  ngOnInit(): void {
     this.activatedRoute.params.subscribe((params) => {
        if (params['carId']) {
           this.getPhotosByCarId(params['carId']);
           this.getCarById(params['carId']);
        }
     });
     console.log(this.carDetail.brandName+this.carDetail.colorName)
  }

  getCarById(id: number) {
     this.carDtoService.getCarDetails(id).subscribe((response) => {
        this.carDetail = response.data;
     });
  }

  getPhotosByCarId(carId: number) {
     this.carImageService.getPhotosByCarId(carId).subscribe((response) => {
        this.carImages = response.data;
     });
  }
}
