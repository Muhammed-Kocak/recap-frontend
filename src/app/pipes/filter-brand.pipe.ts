import { Pipe, PipeTransform } from '@angular/core';
import { BrandComponent } from '../components/brand/brand.component';
import { Brand } from '../models/brand';

@Pipe({
  name: 'filterBrand'
})
export class FilterBrandPipe implements PipeTransform {
  transform(value: Brand[], filterText: String): Brand[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (brand: Brand) =>
            brand.brandName.toLocaleLowerCase().indexOf(filterText.toString()) !== -1
        )
      : value;
  }
}
