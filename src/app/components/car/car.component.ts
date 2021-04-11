import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/carService/car.service';
import { PageControlService} from 'src/app/services/pageControlService/page-control.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

   isCollapsed = true;

   carDetail: CarDto;
   carDetails: CarDto[] = [];

   filterBrand="";
   filterColor="";
   filterCar="";


   constructor(private carService: CarService, private activatedRoute: ActivatedRoute,private pageControlService:PageControlService) {
      
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
      console.log()
   }

   whichPageControl(){
      if (this.pageControlService.whichPageControl("/cars").valueOf()) {
         return true;
      }else{
         return false;
      }
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
   
}
