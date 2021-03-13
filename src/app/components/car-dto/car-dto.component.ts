import { Component, OnInit } from '@angular/core';
import { CarDto } from 'src/app/models/carDto';
import { CarDtoService } from 'src/app/services/carDtoService/car-dto.service';

@Component({
  selector: 'app-car-dto',
  templateUrl: './car-dto.component.html',
  styleUrls: ['./car-dto.component.css']
})
export class CarDtoComponent implements OnInit {

  carsDtos:CarDto[] = [];

  constructor(private carDtoService:CarDtoService) { }

  ngOnInit(): void {
    this.getCarDetails();
  }

  getCarDetails() {
    this.carDtoService
    .getCarDetails()
    .subscribe(response=>{this.carsDtos = response.data;})
  }
}
