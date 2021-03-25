import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailAndImagesDto } from 'src/app/models/CarDetailAndImagesDto';
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
  carDetailAndImagesDto: CarDetailAndImagesDto;
  carImages: CarImage[] = [];
  imageBaseUrl = "https://localhost:44332/Images/";

  constructor(
     private activatedRoute: ActivatedRoute,
     private carImageService: CarImageService,
     private carDtoService:CarDtoService) {
  }

  ngOnInit(): void {
     this.activatedRoute.params.subscribe((params) => {
        if (params["carId"]) {
           this.getPhotosByCarId(params["carId"]);
           this.getCarDetailAndImagesDto(params["carId"]);
           this.getCarDetailsById(params["carId"]);
        }
     });
  }

  getCarDetailsById(carId:number){
     this.carDtoService.getCarDetailsById(carId).subscribe((response)=>{
      this.carDetail =response.data 
     }
     );
     
  }

  getPhotosByCarId(carId: number) {
     this.carImageService.getPhotosByCarId(carId).subscribe((response) => {
        this.carImages = response.data;
     });
  }

  getCarDetailAndImagesDto(carId:number){
   this.carDtoService.getCarDetailAndImagesDto(carId).subscribe(response => {
     this.carDetailAndImagesDto = response.data;
   })
 }

 getSliderClassName(index:Number){
   if(index == 0){
     return "carousel-item active";
   } else {
     return "carousel-item";
   }
 }
}
