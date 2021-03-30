import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carsDto: CarDto[];

  brands: Brand[];
  colors: Color[];

  carAddForm: FormGroup;
  carUpdateForm: FormGroup;

  carId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService,
    private rooter:Router
  ) {}

  ngOnInit(): void {
    this.getCarsDto();
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
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

  getCarsDto() {
    this.carService.getCars().subscribe((response) => {
      this.carsDto = response.data;
    });
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.carAdd(carModel).subscribe(
        (response) => {
          this.toastrService.success('Ekleme Başarılı', response.messages);
          setTimeout(() => { this.toastrService.info('Arabalar Sayfasına Yönlendiriliyorsunuz..');  }, 1000);
          setTimeout(() => { this.rooter.navigate(["/cars"])  }, 3500);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'İşlem Başarısız..!!'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.warning('Form boş bırakılamaz');
    }
  }

  getCar(carDto: CarDto) {
    this.carId = carDto.carId;
  }

}
