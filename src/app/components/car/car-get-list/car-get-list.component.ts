import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/carService/car.service';

@Component({
  selector: 'app-car-get-list',
  templateUrl: './car-get-list.component.html',
  styleUrls: ['./car-get-list.component.css']
})
export class CarGetListComponent implements OnInit {

  cars: CarDto[] = [];
  constructor(private carService: CarService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.toastrService.success("Arabalar Getirildi");
      this.cars = response.data;
    }, responseError => {
      this.toastrService.error(responseError.error.message, "Arabalar Getirilemedi")
    })
  }
}
