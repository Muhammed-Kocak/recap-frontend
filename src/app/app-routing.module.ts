import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarDtoComponent } from './components/car-dto/car-dto.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  { path: 'rentals', component: RentalComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/details/:carId', component: CarDtoComponent },
  { path: 'brands', component: BrandComponent },
  { path: 'brands/:brandId', component: BrandComponent },
  { path: 'colors', component: ColorComponent },
  { path: 'colors/:colorId', component: ColorComponent },
  { path: '**', redirectTo: 'rentals', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
