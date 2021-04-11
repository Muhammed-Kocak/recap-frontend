import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brands: Brand[] = [];
  brandName: Brand;
  brandId: Brand;
  brandUpdateForm: FormGroup;

  constructor(
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createBrandUpdateForm();

    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getBrandById(params['brandId']);
      }
    });
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [this.brandId, Validators.required],
      brandName: [this.brandName, Validators.required],
    });
  }

  getBrandById(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brands = response.data;
      Object.keys(this.brands).forEach((b: any) => {
        if (b == 'brandId') {
          this.brandId = this.brands[b];
        } else {
          this.brandName = this.brands[b];
        }
      });
      this.createBrandUpdateForm();
    });
  }

  update() {
    console.log(this.brandUpdateForm.value)
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe((response) => {
        console.log(response.message)
        this.toastrService.success(response.message, 'Başarılı!');
        this.toastrService.success('Markalar Sayfasına Aktarılıyorsunuz!');
        setTimeout(() => {
          this.router.navigate(["admin-dashboard/brands/getlist"])
        }, 3000);
      },
      (responseError) => {
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası");
          }
        }
      });
    }
  }

  delete() {
    let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.delete(brandModel).subscribe((response) => {
        this.toastrService.success(response.message);
        this.toastrService.success('Markalar Sayfasına Aktarılıyorsunuz!');
        setTimeout(() => {
          this.router.navigate(["admin-dashboard/brands/getlist"])
        }, 2000);
      });
    }
  }