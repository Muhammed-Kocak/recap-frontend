import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

   title: string = 'Markalar';
   listAllBrandCss: string = "text-start list-group-item";
   brands: Brand[] = [];
   currentBrandId: number = 0;

   constructor(private brandService: BrandService) {
   }

   ngOnInit(): void {
      this.getBrands();
   }

   getBrands() {
      this.brandService.getBrands().subscribe((response) => {
         this.brands = response.data;
      });
   }

   setCurrentBrand(brandId: number) {
      this.currentBrandId = brandId;
   }

   getCurrentBrandClass(brandId: number): string {
      if (this.currentBrandId == brandId) {
         return 'list-group-item list-group-item-action active';
      }

      return 'list-group-item list-group-item-action';
   }

   resetCurrentBrandId(){
      this.currentBrandId = 0
   }
}
