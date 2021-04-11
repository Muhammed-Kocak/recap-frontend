import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customerDto';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { FindeksService } from 'src/app/services/findeksService/findeks.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  findeksScore:any;
  customerDetails:CustomerDetail[];
  customers:Customer[];
  customerId:number;
  rentDate:Date;
  returnDate?:Date;
  rentalId:number;
  @Input() car:CarDto;

  constructor(
     private activatedRoute:ActivatedRoute,
     private router:Router,
     private customerService:CustomerService,
     private rentalService:RentalService,
     private toastrService:ToastrService,
     private localStorageService:LocalStorageService,
     private findeksService:FindeksService
     ) { }

   
   ngOnInit(): void {
   }
 
   getCustomerDetail(){
      this.customerService.getCustomerDetail().subscribe(response => {
        this.customerDetails = response.data;
        console.log(this.customerDetails)})
   }
   
   getRentMinDate(){
     var today  = new Date();
     //min="1980-01-01"
     today.setDate(today.getDate() + 1);
     return today.toISOString().slice(0,10)
   }
   getReturnMinDate(){
     var today  = new Date();
     today.setDate(today.getDate() + 2);
     return today.toISOString().slice(0,10)
   }
   createRental(){
     let MyRental:Rental = {
       rentDate: this.rentDate,
       returnDate: this.returnDate,
       carId: this.car.carId,
       customerId: parseInt(this.customerId.toString())
     }
     console.log(MyRental);

     this.rentalService.rentalCheckout = MyRental;

     this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz...", "Ödeme İşlemleri");
     setTimeout(() => { this.router.navigate(['/payment/', JSON.stringify(MyRental)]);  }, 2000);
   }
}