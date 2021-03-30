import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarDtoComponent } from './components/car-dto/car-dto.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalDtoComponent } from './components/rental-dto/rental-dto.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  { path: 'rentals', component: RentalComponent },
  { path: 'rental/details', component: RentalDtoComponent },
  { path: 'payment/:rental', component: PaymentComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/details/:carId', component: CarDtoComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'cars/update', component: CarUpdateComponent },
  { path: 'brands', component: BrandComponent },
  { path: 'brands/:brandId', component: BrandComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'brands/update/:brandId',component: BrandUpdateComponent,},
  { path: 'colors', component: ColorComponent },
  { path: 'colors/:colorId', component: ColorComponent },
  { path: 'colors/add', component: ColorAddComponent },
  { path: 'colors/update/:colorId',component: ColorUpdateComponent },
  { path: 'cars/filter/:brandId/:colorId', component: CarComponent },
  { path: '**', redirectTo: 'cars', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
