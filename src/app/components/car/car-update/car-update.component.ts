import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarDtoService } from 'src/app/services/carDtoService/car-dto.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
  selectedCar: Car;
  selectedCarDto: CarDto;

  brands: Brand[] = [];
  colors: Color[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      if (parameter['carId']) {
        this.getCarById(parameter['carId']);
        this.getCarDetailById(parameter['carId']);
        this.getBrands();
        this.getColors();
        this.createCarUpdateForm();
      }
    });

  }

  getCarDetailById(carId: number) {
    this.carService.getCarDtoById(carId).subscribe((response) => {
      this.selectedCarDto = response.data;
    });
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.selectedCar = response.data;

      this.carUpdateForm.get('carId')?.setValue(this.selectedCar.carId);
      this.carUpdateForm.get('brandId')?.setValue(this.selectedCar.brandId);
      this.carUpdateForm.get('colorId')?.setValue(this.selectedCar.colorId);
      this.carUpdateForm.get('modelYear')?.setValue(this.selectedCar.modelYear);
      this.carUpdateForm.get('dailyPrice')?.setValue(this.selectedCar.dailyPrice);
      this.carUpdateForm.get('description')?.setValue(this.selectedCar.description);
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
    })  
  }

  update(){
    if(this.carUpdateForm.valid){
      let updateCarModel=Object.assign({},this.carUpdateForm.value);
      this.carService.carUpdate(updateCarModel).subscribe(
        (response) => {
          this.toastrService.success(response.message,"Başarılı");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (responseError) => {
          if(responseError.error.Errors.length>0){
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası");
            }
          }
        }
      );
    }
  }
  delete() {
    let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.carDelete(carModel).subscribe((response) => {
        this.toastrService.success(response.message);
        this.toastrService.success('Arabalar Sayfasına Aktarılıyorsunuz!');
        setTimeout(() => {
          this.router.navigate(["admin-dashboard/cars/getlist"])
        }, 2000);
      });
    }
}


