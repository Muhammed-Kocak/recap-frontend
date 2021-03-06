import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators ,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private toastrService: ToastrService,private router:Router,private brandService:BrandService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    })
  }

  add() {
    let brandModel = Object.assign({}, this.brandAddForm.value);
    console.log(brandModel)
    if (this.brandAddForm.valid) {
      this.brandService.add(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.toastrService.success('Liste sayfasına aktarılıyorsunuz..');
          setTimeout(() => {
            this.router.navigate(["admin-dashboard/brands/getlist"])
          }, 3000);
        },
        (responseError) => {
          console.log(responseError)
          for (
            let i = 0;
            i < responseError.error.length;
            i++
          ) {
            this.toastrService.error(
              responseError.error[i].message,
              'Doğrulama Hatası'
            );
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat!');
    }
  }
}
