import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/carService/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
   carDetail: CarDto;
   carDetails: CarDto[] = [];

   currentBrandId: number = 0;
   currentColorId: number = 0;
   currentCarId: number = 0;
   filterBrand="";
   filterColor="";
   filterCar="";


   constructor(private carService: CarService, private activatedRoute: ActivatedRoute) {
   }

   ngOnInit(): void {
      this.activatedRoute.params.subscribe((params) => {
         if (params['brandId']) {
            return this.getCarsByBrandId(params['brandId']);
         }
         if (params['colorId']) {
            return this.getCarsByColorId(params['colorId']);
         }
         return this.getCars();
      });
   }

   getCars() {
      this.carService.getCars().subscribe((response) => {
         this.carDetails = response.data;
      });
   }

   getCarsByBrandId(brandId: number) {
      this.carService.getCarsByBrandId(brandId).subscribe((response) => {
         this.carDetails = response.data;
      });
   }

   getCarsByColorId(colorId: number) {
      this.carService.getCarsByColorId(colorId).subscribe((response) => {
         this.carDetails = response.data;
      });
   }
   setCurrentCar(carId: number) {
      this.currentCarId = carId;
   }
   getCurrentCarClass(carId: number): string {
      if (this.currentCarId == carId) {
         return 'list-group-item list-group-item-action active';
      }
      return 'list-group-item list-group-item-action';
   }
   resetCurrentBrandId(){
      this.currentBrandId= 0;
      this.currentColorId= 0;
      this.currentCarId = 0;
   }
   removeCurrentColor(){
      this.currentBrandId= 0;
      this.currentColorId= 0;
      this.currentCarId = 0;
      this.filterBrand="";
      this.filterColor="";
      this.filterCar="";
    }
}
