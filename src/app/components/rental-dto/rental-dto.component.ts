import { Component, OnInit } from '@angular/core';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentalDtoService } from 'src/app/services/rentalDtoService/rentalDto.service';

@Component({
  selector: 'app-rental-dto',
  templateUrl: './rental-dto.component.html',
  styleUrls: ['./rental-dto.component.css']
})
export class RentalDtoComponent implements OnInit {

  rentalDtos:RentalDto[]= [];

  constructor(private rentalDtoService:RentalDtoService) { }

  ngOnInit(): void {
    this.getRentalDto();
  }

  getRentalDto(){
    this.rentalDtoService.getRentalDto().subscribe(response=> this.rentalDtos = response.data)
  }
}
