import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand-get-list',
  templateUrl: './brand-get-list.component.html',
  styleUrls: ['./brand-get-list.component.css']
})
export class BrandGetListComponent implements OnInit {

  brands: Brand[] = [];

  constructor(private brandService: BrandService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.toastrService.success("Markalar Getirildi");
      this.brands = response.data;
    }, responseError => {
      this.toastrService.error(responseError.error.message, "Markalar Getirilemedi")
    })
  }
}
